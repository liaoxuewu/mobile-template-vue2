import { POST } from '@/api/request.js'
import config from '../../../public/config'

export default {
  /**
   * @description: api登录请求
   * @param {*}
   * @return {*} 请求响应promise
   */
  login(
    body = {
      params: {},
      data: {},
      headers: { 'content-type': 'application/json' }
    }
  ) {
    return POST({
      url: config.baseUrl + '/login',
      ...body,
      data: {
        ...body.data
      }
    })
  }
}
