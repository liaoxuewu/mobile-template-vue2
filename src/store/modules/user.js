export default {
  namespaced: true,
  state: {
    baseUrl: localStorage.getItem('base_url'), // 请求服务器地址
    userInfo: localStorage.getItem('user_info') // 登陆用户信息
  },
  getters: {
    // isTokenValid(state) {
    //     return !!state.token && state.tokenExpired > Date.now()
    // },
    // 获取请求服务器地址
    getBaseUrl(state) {
      return state.baseUrl
    }, // 获取登陆用户信息
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    // 设置请求服务器地址到缓存
    SET_BASE_URL: (state, baseUrl) => {
      state.baseUrl = baseUrl
      localStorage.setItem('base_url', baseUrl)
    },
    // 移除缓存中的请求服务器地址
    REMOVE_BASE_URL: state => {
      state.baseUrl = ''
      localStorage.removeItem('base_url')
    },
    // 设置登陆用户信息（含token）
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      localStorage.setItem('user_info', userInfo)
    },
    // 移除登陆用户信息
    REMOVE_USER_INFO: state => {
      state.userInfo = ''
      localStorage.removeItem('user_info')
    }
  },
  actions: {
    // 页面调用的设置用户信息方法
    setUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    },
    // 页面调用的设置请求服务地址方法
    setBaseUrl({ commit }, baseUrl) {
      commit('SET_BASE_URL', baseUrl)
    },
    // 页面调用的移除请求服务地址方法
    removeBaseUrl({ commit }) {
      commit('REMOVE_BASE_URL')
    }
  }
}
