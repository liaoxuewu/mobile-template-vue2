import Vue from 'vue'
import Router from 'vue-router'
import config from '../../public/config'
// import indexA from './indexA'
// import indexB from './indexB'

Vue.use(Router)

// const index = r => require.ensure([], () => r(require('@/views/index/index' + config.hospitalId)))
// const detail = r => require.ensure([], () => r(require('@/views/detail/Detail' + config.hospitalId)))

const index = r => require.ensure([], () => r(require('@/views/index/index')))
const detail = r => require.ensure([], () => r(require('@/views/detail/Detail')))
const router = 'index' + config.hospitalId
console.log(router)
// console.log(indexA)

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
      path: '/detail',
      component: detail,
      name: `Detail${config.hospitalId}`,
      meta: {
        keepAlive: false,
        showHeader: false,
        title: '详情',
        noAuth: false
      }
    }
  ]
})
