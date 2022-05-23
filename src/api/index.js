import { requireAllModule } from '@/common/utils/common.js'
import { requestParams } from './request.js'

const apisModules = requireAllModule({
  requireContext: require.context('./modules/', false, /\.js$/),
  exclude: ['index']
})
  .reduce((pre, cur) => {
    if (cur?.default) pre.push(cur.default)
    return pre
  }, [])
  .flat(Infinity)
  .reduce((pre, cur) => {
    console.log(Object)
    console.log(Object.isObject)
    if (Object.isObject(cur)) {
      pre = {
        ...pre,
        ...cur
      }
    }
    return pre
  }, {})

export default {
  ...apisModules,
  install: Vue => {
    Vue.prototype.$api = apisModules
    Vue.prototype.$requestParams = requestParams
  }
}
