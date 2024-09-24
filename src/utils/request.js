import { showFailToast } from 'vant'
import axios from 'axios'
import { getToken } from './auth'
// import * as crypto from './crypto'
import 'vant/es/toast/style'
import { TOKEN_KEY, TOKEN_KEY2 } from '@/utils/auth'

// 默认 axios 实例请求配置
const configDefault = {
  headers: {},
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {},
  withCredentials: true
}
const SUCCESSCODE = 200
// 无感刷新token
let refreshing = false // 是否正在刷新token
let queue = []

// // 请求内容加密
// const requestEncrypt = (data) =>{
//   console.log('请求报文: ',data)
//   data = {
//     key: crypto.sm2Encrypt(crypto.SM4KEY),
//     content: crypto.sm4Encrypt(data),
//   }
//   return data
// }
// // 响应内容解密
// const  responseDecrypt = (response) =>{
//     // console.log('response==================>',response)
//     const { key, content } = response.data
//     let resData = crypto.sm4Decrypt(content,key)
//     console.log('响应报文: ',resData)
//     return resData
// }
class Http {
  // 当前实例
  static axiosInstance
  // 请求配置
  static axiosConfigDefault

  // 请求拦截
  httpInterceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 发送请求前，可在此携带 token
        const token = getToken()
        if (token) {
          // config.headers['Authorization'] = 'Bearer ' + token
          config.headers['Jwt-Token'] = token
        }
        return config
      },
      (error) => {
        showFailToast(error.message)
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  httpInterceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // 开启加密
        // let resData = responseDecrypt(response)
        let resData = response.data

        // 与后端协定的返回字段
        const { code, message } = resData
        // 判断请求是否成功
        const isSuccess = response && Reflect.has(resData, 'code') && code === SUCCESSCODE
        // console.log(code, message, resData ,isSuccess,'-------------------')
        if (isSuccess) {
          return resData.data
        } else {
          // 处理请求错误
          showFailToast(message)
          return Promise.reject(resData.data)
        }
      },
      async (error) => {
        try {
          // console.log(error)
          let { status, data, config } = error.response || {}
          console.log('status========================>', status)
          if (refreshing) {
            return new Promise((resolve) => {
              queue.push({
                config,
                resolve
              })
            })
          }

          let message = ''
          // HTTP 状态码
          console.log('==================>response.data', data)
          switch (status) {
            case 400:
              message = '请求错误'
              break
            case 401:
              message = '未授权，请登录'
              if (status === 401 && !config.url.includes('/user/refresh')) {
                refreshing = true

                const res = await refreshToken()

                refreshing = false

                if (res) {
                  queue.forEach(({ config, resolve }) => {
                    resolve(this.axiosInstance(config))
                  })
                  queue = []
                  return this.axiosInstance(config)
                } else {
                  message = data.message || '登录过期，请重新登录'
                }
              } else {
                return error.response
              }
              break
            case 403:
              message = data.message || '拒绝访问'
              break
            case 404:
              message = data.message || `请求地址出错: ${error.response?.config?.url}`
              break
            case 408:
              message = data.message || '请求超时'
              break
            case 500:
              message = data.message || '服务器内部错误'
              break
            case 501:
              message = data.message || '服务未实现'
              break
            case 502:
              message = data.message || '网关错误'
              break
            case 503:
              message = data.message || '服务不可用'
              break
            case 504:
              message = data.message || '网关超时'
              break
            case 505:
              message = data.message || 'HTTP版本不受支持'
              break
            default:
              message = data.message || '网络连接故障'
          }

          showFailToast(message)
          return Promise.reject(error)
        } catch (error) {
          return Promise.reject('网络连接故障')
        }
      }
    )
  }

  constructor(config) {
    this.axiosConfigDefault = config
    this.axiosInstance = axios.create(config)
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 通用请求函数
  request(paramConfig) {
    const config = { ...this.axiosConfigDefault, ...paramConfig }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  post(url, data) {
    // data = requestEncrypt(data)
    return this.request({ url, method: 'post', data })
  }
  patch(url, data) {
    return this.request({ url, method: 'patch', data })
  }
  get(url, params) {
    return this.request({ url, method: 'get', params })
  }
  del(url, params) {
    return this.request({ url, method: 'delete', params })
  }
}
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(TOKEN_KEY2) || ''
  const res = await http.get('/mobile/refreshToken', { token: refreshToken })
  // console.log(res,'refreshToken>>>>>>>')
  localStorage.setItem(TOKEN_KEY, res.accessToken)
  localStorage.setItem(TOKEN_KEY2, res.refreshToken)
  return res
}
export const http = new Http(configDefault)
