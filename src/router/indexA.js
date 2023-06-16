import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import config from '../../public/config'
console.log(config)
export default new Router({
  routes: [
    {
      path: '/detail',
      components: {
        default: () => import(`@/views/detail/Detail${config.hospitalId}`)
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
