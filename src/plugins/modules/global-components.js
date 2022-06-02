import Vue from 'vue'
import { requireAllModule } from '@/utils/common.js'

const prefix = 'g-'
requireAllModule({
  requireContext: require.context('@/components/base', true, /\.vue$/)
})
  .concat(
    requireAllModule({
      requireContext: require.context('@/components/business', true, /\.vue$/)
    })
  )
  .forEach(v => {
    if (v.default.name) {
      const componentName = v.default.name?.toString?.()?.startsWith?.(prefix)
        ? `${v.default.name}`
        : `${prefix}${v.default.name}`
      Vue.component(`${componentName}`, v.default || v)
    }
  })
