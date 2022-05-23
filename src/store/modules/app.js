export default {
  namespaced: true,
  state: {
    systemInfo: [] // 系统信息，视口的宽高等
  },
  getters: {
    // 获取系统信息
    getSysInfo(state) {
      return state.systemInfo
    }
  },
  mutations: {
    // 设置系统信息
    SET_SYS_INFO: (state, systemInfo) => {
      state.systemInfo = systemInfo
    }
  },
  actions: {
    // init({
    // 	commit
    // }) {
    // 	return request('getCurrentUserInfo', {}, {
    // 		functionName: 'uni-id-cf'
    // 	}).then(res => {
    // 		const {
    // 			navMenu,
    // 			userInfo
    // 		} = res
    // 		// commit('SET_NAV_MENU', navMenu)
    // 		commit('user/SET_USER_INFO', userInfo, {
    // 			root: true
    // 		})
    // 	})
    // },
    // 设置系统信息方法
    setSysInfo({ commit }, systemInfo) {
      commit('SET_SYS_INFO', systemInfo)
    }
  }
}
