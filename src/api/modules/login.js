import request from '../request'
/**
 * @description: api登录请求
 * @param {*} code 用户名
 * @param {*} pwd 密码
 * @return {*} 请求响应promise
 */
export function login(code, pwd) {
  return request({
    url: '/Author/Login', //http:/ssss
    method: 'post',
    data: { UserCode: code, Pwd: pwd }
  })
}

/**
 * @description: 绑定账号，绑定后返回token
 * @param {*} wxUserId 企业号返回的用户code
 * @param {*} hospCode 机构号
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @return {*}
 * {
  "Code": 0,
  "BizCode": 0,
  "ErrorMsg": "string",
  "InfoMsg": "string",
  "Rst_Data": {
    "AccessToken": "string",
    "RefreshTokenExpired": 0,
    "RefreshToken": "string",
    "RoleCode": "string"
  },
  "Rst_Count": 0
}
 */
export function BindCode(body = { params: {}, data: {} }) {
  return request({
    url: '/Author/BindCode',
    method: 'get',
    ...body,
    params: { ...body.params }
  })
}

/**
 * @description: 企业微信直接登录 微信企业号检测用户是否已经绑定,绑定则返回token
 * @param {*} code 企业号返回的用户code
 * @param {*} hospCode 机构代码
 * @param {*} agentId 企业号返回
 * @return {*}
 * {
  "Code": 0,
  "BizCode": 0,
  "ErrorMsg": "string",
  "InfoMsg": "string",
  "Rst_Data": {
    "AccessToken": "string",
    "RefreshTokenExpired": 0,
    "RefreshToken": "string",
    "RoleCode": "string"
  },
  "Rst_Count": 0
}
 */
export function CheckCode(body = { params: {}, data: {} }) {
  return request({
    url: '/Author/CheckCode',
    method: 'get',
    ...body,
    params: { ...body.params }
  })
}
