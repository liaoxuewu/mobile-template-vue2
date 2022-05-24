import Vue from 'vue'

import Router from 'vue-router'

import index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 链接路径
      name: '首页', // 路由名称，
      component: index // 对应的组件模板
    }
  ]
})
