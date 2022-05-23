import user from './modules/user.js'
import app from './modules/app.js'
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
// const vuexPersisted = new createPersistedState({
// 	storage: {
// 		key: 'app_config_data',  // 状态保存到本地的 key
// 		paths: ['baseUrl'],  // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
// 		getItem: key => uni.getStorageSync(key),
// 		setItem: (key, value) => uni.setStorageSync(key, value),
// 		removeItem: key => uni.removeStorageSync(key)
// 	}
// })
const store = new Vuex.Store({
  state: {
    // 存放状态
    baseUrl: ''
  },
  // plugins: [ vuexPersisted ],
  modules: {
    user,
    app
  }
})

export default store
