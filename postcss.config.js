// postcss.config.js
module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,// UI设计稿的宽度
        viewportHeight: 667,
        unitPrecision: 5, //转换后的精度，即小数点位数
        viewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true,// 是否在媒体查询的css代码中也进行转换，默认false
        // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        // landscape: true, // 是否处理横屏情况
        // landscapeUnit:'vh', // 横屏时使用的单位
        // landscapeWidth:375 // 横屏时使用的视口宽度
      },
    },
  }
  // D:\study\myGiteePro\JDapp\node_modules\postcss-px-to-viewport\index.js
  // 开启横屏是报atRule报错，改为AtRule即可