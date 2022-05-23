/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/14 18:15
 */
import { requireAllModule } from '@/utils/common.js'
/**
 * 注册所有插件
 */
requireAllModule({
  requireContext: require.context('./modules/', true, /\.js$/),
  exclude: []
})
