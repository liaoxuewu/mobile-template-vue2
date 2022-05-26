import { POST } from '@/api/request.js'
import config from '../../../public/config'

export default {
  /**
   * @description: api登录请求
   * @param {*}
   * @return {*} 请求响应promise
   */
  getData(
    body = {
      params: {},
      data: {}
    }
  ) {
    return POST({
      url: config.baseUrl + '/getData',
      ...body,
      data: {
        ...body.data
      }
    })
  }
}
