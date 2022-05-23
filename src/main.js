import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'vant/lib/icon/local.css'
import 'vant/lib/index.css' //必须引入组件样式

import 'lib-flexible/flexible.js' //字体适配
import './assets/main.css'
import './libs' // 引入插件

import { Icon, Cell, CellGroup, Loading, Button, Toast } from 'vant'
import {
  Search,
  Tabbar,
  TabbarItem,
  NavBar,
  ActionSheet,
  PullRefresh,
  Tab,
  Tabs,
  Collapse,
  CollapseItem,
  Popup
} from 'vant'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import './assets/font/font-awesome-4.7.0/css/font-awesome.css'
import VConsole from 'vconsole/dist/vconsole.min.js'
let vConsole = new VConsole();
let options = {
  fullscreenEl: false
}
Vue.use(preview, options)
Vue.use(preview)

Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(NavBar)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Search)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
//Vue.use(loading);
Vue.use(Button)
Vue.use(Popup)
Vue.use(Loading)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  base: window.appconfig,
  render: h => h(App)
}).$mount('#app')
