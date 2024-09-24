import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// import legacy from '@vitejs/plugin-legacy'
import { VantResolver } from '@vant/auto-import-resolver'
import { viteMockServe } from 'vite-plugin-mock'
// import topLevelAwait from 'vite-plugin-top-level-await'
// import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  //eslint-disable-next-line
  const env = loadEnv(mode, process.cwd(), '')
  const prefixPath = env.VITE_PREFIX_PATH
  console.log('当前环境: ' + mode)

  const images = ['png', 'jpeg', 'svg','jpg', 'gif','webp']
  return {
    build: {
      // target:'esnext',
      target:'es2015',
      chunkSizeWarningLimit: 500,// 500k
      rollupOptions: {
        output: {
          /* 
            用于创建自定义的公共 chunk
            返回一个名称为分块的名字
          */
          manualChunks(id,/* {getModuleInfo,getModuleIds} */) {
            if (id.includes('vant')) {
              return 'vendor-vant'
            }else if (['/vue/','/@vue/','vue-router', 'pinia','axios'].some(v=>id.includes(v))) {
              // console.log(id)
              return 'vendor-core'
            } else if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
          hashCharacters: 'hex',
          // 1.用于自定义构建结果中的静态资源名称
          // 2.定义各类型文件的目录分类
          assetFileNames: (assetInfo) => {
            // 根据文件类型决定输出目录
            if (assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name]-[hash:8][extname]'
            } else if (images.some(ext => assetInfo.name.endsWith(ext))) {
              return 'assets/images/[name]-[hash:8][extname]'
            }
            return 'assets/[name]-[hash:8][extname]'
          },
          // 用于对代码分割中产生的 chunk 自定义命名
          chunkFileNames: (chunkInfo) => {
            // 根据chunk类型决定输出目录
            if (chunkInfo.isEntry) {
              // console.log(chunkInfo)
              return '[name].js'
            }
            return 'chunks/[name]-[hash:8].js'
          },
          // 用于指定 chunks 的入口文件模式
          entryFileNames: (/* chunkInfo */) => {
              // console.log(chunkInfo.isEntry)
            // 所有入口文件输出到'entrys'目录
            return 'entrys/[name]-[hash:8].js'
          }
        }
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      viteMockServe({
        mockPath: './mock/'
      }),
      /* 
      兼容性处理 输出文件会legacy标识
      开启之后打包速度会加倍(代码降级转化) 
      */
      // legacy({
      //   targets: ['defaults', 'not IE 11']
      //   // targets: ['Chrome 63'],
      //   // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      //   // modernPolyfills: true
      // }),
      // topLevelAwait(),
      /* 
        UI库cdn引入按需打包不了
        依赖于vue的，必须一起cdn或者全部不cdn否则报错
       */
      // importToCDN({
      //   prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
      //   modules: [
      //     // autoComplete('vue'),
      //     autoComplete('axios')
      //     // {
      //     //   name: 'vue-router',
      //     //   var: 'VueRouter',
      //     //   path: 'dist/vue-router.global.min.js'
      //     // },
      //     // {
      //     //   name: 'vue-demi',
      //     //   var: 'VueDemi',
      //     //   path: 'lib/index.iife.min.js'
      //     // },
      //     // {
      //     //   name: 'pinia',
      //     //   var: 'Pinia',
      //     //   path: 'dist/pinia.iife.min.js'
      //     // },
      //   ]
      // })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: '9527',
      host: '0.0.0.0',
      proxy: {
        [prefixPath]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${prefixPath}`), '')
        }
      }
    }
  }
})
// https://cdn.jsdelivr.net/npm/vue-router@4.3.0/dist/vue-router.global.min.js
