import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/detail',
      components: {
        default: () => import('@/views/detail/DetailA')
      },
      name: 'Detail',
      meta: {
        keepAlive: false,
        showHeader: false,
        title: '详情',
        noAuth: false
      }
    }
  ]
})
