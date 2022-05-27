import Vue from 'vue'

import Router from 'vue-router'

import index from '@/views/index'
import User from '@/views/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 链接路径
      name: '首页', // 路由名称
      component: index // 对应的组件模板
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        showHeader: false,
        title: '登录',
        noAuth: true
      },
      component: () => import('@/views/login/Login')
    },
    {
      path: '/detail/Detail',
      components: {
        default: () => import('@/views/detail/Detail')
      },
      name: 'Detail',
      meta: {
        keepAlive: false,
        showHeader: false,
        title: '详情',
        noAuth: false
      }
    },
    {
      path: '/user/User',
      components: {
        default: () => import('@/views/user/User')
      },
      name: 'User',
      meta: {
        keepAlive: false,
        showHeader: false,
        title: '个人中心',
        noAuth: false
      }
    }
  ]
})
