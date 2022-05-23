import request from './request'

/**
 * @description: 获取列表
 * @param {*} doctcode
 * @return {*} 列表
 * {
  "Code": 0,
  "InfoMsg": "string",
  "Rst_Data": [
    {
      "Hosp_Code": "string", // 机构号
    }
  ]
}
 */
export function GetInHospAreaList(body = { params: {}, data: {} }) {
  return request({
    url: '',
    method: 'get',
    ...body,
    params: { ...body.params }
  })
}
