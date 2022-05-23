/**
 * @Description:
 * @Author BPF
 * @create 2021/11/24 17:36
 */

;(function (window, factory) {
  factory()
})(window, function () {
  String.isString = args => Object.prototype.toString.call(args) === '[object String]'
  Object.isObject = args => Object.prototype.toString.call(args) === '[object Object]'
  Object.isNull = args => Object.prototype.toString.call(args) === '[object Null]'
  Object.isUndefined = args => Object.prototype.toString.call(args) === '[object Undefined]'
  Number.isNumber = args => Object.prototype.toString.call(args) === '[object Number]'
  Function.isFunction = args => Object.prototype.toString.call(args) === '[object Function]'
  Object.cloneDeep = obj => JSON.parse(JSON.stringify(obj))
  Array.isArrayEmpty = args => Array.isArray(args) && args.length == 0
  String.isStringEmpty = args => String.isString(args) && args == ''

  Number.prototype.mul = function (arg) {
    //乘法
    let m = 0,
      s1 = this.toString(),
      s2 = arg.toString()
    try {
      m += s1.split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
  }

  Number.prototype.add = function (arg) {
    //加法
    let r1, r2, m
    try {
      r1 = this.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (this.mul(m) + Number(arg).mul(m)).div(m)
  }

  Number.prototype.sub = function (arg) {
    //减法
    return this.add(-arg)
  }
  Number.prototype.div = function (arg) {
    //除法
    let t1 = 0,
      t2 = 0,
      r1,
      r2
    try {
      t1 = this.toString().split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
      t2 = arg.toString().split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    r1 = Number(this.toString().replace('.', ''))
    r2 = Number(arg.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }

  // json解析，防止抛出异常
  JSON.parseNoError = str => {
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  }

  /*进程环境*/
  window.process = {
    ...process,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      BASE_URL: process.env.BASE_URL
    }
  }
})
