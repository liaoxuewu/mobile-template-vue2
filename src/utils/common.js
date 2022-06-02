/**
 * 自动化注册 需要模块
 * @param requireContext 语法require.context(目录,是否递归目录, 文件筛选条件)所有参数必须是直接字符串，变量无效。
 * @param exclude 只引入包括的模块
 * @param include 排除的模块 include 和 exclude不能同时共用
 * @returns {*}  Array
 */
export const requireAllModule = ({ requireContext, exclude = [], include = [] }) => {
  if (!Array.isArray(exclude)) {
    console.error('[warning] exclude字段类型应为Array')
    exclude = []
  }
  if (!Array.isArray(include)) {
    console.error('[warning] include字段类型应为Array')
    include = []
  }
  const isNoEmptyArray = function () {
    return !!(Array.isArray(this) && this.length)
  }
  const isEmptyArray = function () {
    return !!(Array.isArray(this) && this.length === 0)
  }
  if (isNoEmptyArray.apply(exclude) && isNoEmptyArray.apply(include)) {
    throw new Error('include 和 exclude字段不能同时共用')
  }
  const requireAll = context =>
    context.keys().reduce((pre, cur) => {
      const _key = cur.replace(/^\.\/(.*)\.\w+$/, '$1')
      if (isNoEmptyArray.apply(include)) {
        include.some(v => new RegExp(v).test(_key)) && pre.push(context(cur))
      } else if (isNoEmptyArray.apply(exclude)) {
        exclude.every(v => !new RegExp(v).test(_key)) && pre.push(context(cur))
      } else if (isEmptyArray.apply(include) && isEmptyArray.apply(exclude)) {
        pre.push(context(cur))
      }
      return pre
    }, [])
  return requireAll(requireContext)
}
