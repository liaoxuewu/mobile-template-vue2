import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例
const instance = axios.create({
  timeout: 2 * 60 * 1000 // 请求超时时间
})

instance.defaults.headers.post['Content-Type'] = 'application/json' // 'application/json';
instance.defaults.baseURL = ''

// request拦截器
instance.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        // Authorization: null,
        ...config.headers
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === '401' || res.code === 401 || res.error == 'unauthorized') {
      Toast('登录已过期, 请重新登录')
      return Promise.reject('登录已过期, 请重新登录')
    } else {
      return res
    }
  },
  error => {
    console.error('服务器error:', error.toString(), String(error))
    if (error?.response) {
      const { status } = error.response
      switch (status) {
        case 400:
          Toast('传参数据结构错误')
          break
        case 401:
          Toast('登录已过期, 请重新登录(401)')
          break
        case 404:
          Toast('请求出错(404)')
          break
        case 408:
          Toast('请求超时(408)')
          break
        case 500:
          Toast('服务器错误(500)')
          break
        case 501:
          Toast('服务未实现(501)')
          break
        case 502:
          Toast('网络错误(502)')
          break
        case 503:
          Toast('服务不可用(503)')
          break
        case 504:
          Toast('网络超时(504)')
          break
        case 505:
          Toast('HTTP版本不受支持(505)')
          break
        default:
          Toast('网络似乎正在开小差，请耐心等待')
      }
    } else if (String(error).includes('timeout')) {
      Toast('网络请求超时')
    }
    return Promise.reject(error)
  }
)

export const POST = ({ url, params = {}, data = {}, headers = {}, ...others }) =>
  instance({ url, method: 'POST', data, params, headers, ...others })

export const GET = ({ url, params = {}, data = {}, headers = {}, ...others }) =>
  instance({ url, method: 'GET', data, params, headers, ...others })

export const DELETE = ({ url, params = {}, data = {}, headers = {}, ...others }) =>
  instance({ url, method: 'DELETE', data, params, headers, ...others })

export const PUT = ({ url, params = {}, data = {}, headers = {}, ...others }) =>
  instance({ url, method: 'PUT', data, params, headers, ...others })
