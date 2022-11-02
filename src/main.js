import Vue from 'vue'
import './utils/global-prototype' // 挂在window 上 Number、Object、Array、String、原型
import './plugins' // 引入插件
import App from './App'
import router from './router'
import store from './store/index'
import 'vant/lib/icon/local.css'
import 'vant/lib/index.css' //必须引入组件样式

import 'lib-flexible/flexible.js' //字体适配
import './assets/main.css'
import './plugins' // 引入插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import './assets/font/font-awesome-4.7.0/css/font-awesome.css'
import VConsole from 'vconsole/dist/vconsole.min.js'
let options = {
  fullscreenEl: false
}
Vue.use(preview, options)
Vue.use(preview)
Vue.config.productionTip = false

// 检测版本变更
const VUE_APP_VERSION = require('../package.json').version // 当前版本号
const STORE_VERSION = window.localStorage.getItem('app_version') // 缓存的版本号
console.log('版本号 new：' + VUE_APP_VERSION)
console.log('版本号 old：' + STORE_VERSION)
if (VUE_APP_VERSION !== STORE_VERSION) {
  window.localStorage.clear()
  window.localStorage.setItem('app_version', VUE_APP_VERSION)
  window.location.reload(true)
}

new Vue({
  router,
  store,
  base: window.appconfig,
  render: h => h(App)
}).$mount('#app')
