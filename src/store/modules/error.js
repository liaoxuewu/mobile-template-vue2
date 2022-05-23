export default {
  namespaced: true,
  state: {
    logs: [] // 日志
  },
  mutations: {
    // 添加错误日志
    ADD_ERROR_LOG: (state, log) => {
      state.logs.unshift(log)
    },
    // 清楚错误日志
    CLEAR_ERROR_LOG: state => {
      state.logs.splice(0)
    }
  },
  actions: {
    add({ commit }, log) {
      if (!log.route) {
        const pages = getCurrentPages()
        if (pages.length) {
          log.route = pages[pages.length - 1].route
        }
      }
      log.route = '/' + (log.route || '')
      commit('ADD_ERROR_LOG', log)
    },
    clear({ commit }) {
      commit('CLEAR_ERROR_LOG')
    }
  }
}
