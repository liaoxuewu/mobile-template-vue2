/**
 * @description: 获取本地数据
 * @param {*}
 * @return {*}
 */
export const getLocalStorage = (...args) => {
  const storage = {}
  args.forEach(arg => {
    storage[arg] = window.localStorage.getItem(arg) || null
  })
  return storage
}
/**
 * @description: 设置本地数据
 * @param {*}
 * @return {*}
 */
export const setLocalStorage = data => {
  Object.keys(data).forEach(prop => {
    console.log(data)
    const el = data[prop]
    window.localStorage.setItem(prop, el)
  })
}
/**
 * @description: 删除本地数据
 * @param {*}
 * @return {*}
 */
export const removeLocalStorage = (...args) => {
  args.forEach(arg => {
    window.localStorage.removeItem(arg)
  })
}
