/**
 * @Author bianpengfei
 * @create 2021/2/18 10:08
 */
/**
 * 高阶函数 持久化state
 * @param key 状态管理keys
 * @param excludes 排除那些模块，包括属性
 * @returns {function(*): void}
 */
export const useVuexPersistencePlugin = ({ key = 'vuex', excludes = [] }) => {
  return store => {
    store.subscribe((mutation, state) => {
      const _state = Object.keys(state).reduce((pre, cur) => {
        if (state[cur]) {
          pre[cur] = Object.cloneDeep(state[cur])
        }
        return pre
      }, {})
      excludes.forEach(v => {
        if (v) {
          const [field, subField] = v.split('/') || []
          if (field && subField) {
            _state[field]?.[subField] && delete _state[field][subField]
          } else if (field) {
            _state[field] && delete _state[field]
          }
        }
      })
      localStorage.setItem(key, JSON.stringify(_state))
    })
  }
}
