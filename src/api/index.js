import { http } from '@/utils/request'

export function getListApi(params) {
  return http.request({
    url: '/list/get',
    method: 'get',
    params
  })
}

export function getListApiError(data) {
  return http.request({
    url: '/list/error',
    method: 'post',
    data
  })
}

export function getInfo() {
  return http.get('/user/info')
}
