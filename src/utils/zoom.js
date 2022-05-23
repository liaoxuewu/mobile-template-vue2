/**
 * @Description: 图片双指缩放
 * @Author liaoxuewu
 * @create 2022/01/11 14:29
 */
import Hammer from 'hammerjs' //引用hammerjs

// 定义缩放方法，接收一个element参数：使用export暴露该方法
export function zoomElement(el) {
  let x = 0, // x轴偏移
    y = 0, // y轴偏移
    lastScale = 1, // 上次缩放值
    currentScale = 1, // 当前缩放值
    center // 双指中心点

  // 初始化hammer
  const hammer = new Hammer(el)
  // 缩放事件默认是关闭的，需要设置启用
  hammer.get('pinch').set({ enable: true })

  // 监听缩放事件
  hammer.on('pinchmove pinchstart pinchin pinchout', e => {
    // 缩放开始时获取上一次缩放值与双指中心点
    if (e.type == 'pinchstart') {
      lastScale = currentScale || 1
      center = e.center
      console.log('centerX:' + center.x)
      console.log('centerY:' + center.y)
    }
    // 当前缩放值 = 上一次缩放值 * 缩放比例
    currentScale = lastScale * e.scale

    // 如果缩放值小于1，重置为1
    if (currentScale < 1) {
      currentScale = 1
    }

    // 偏移量 = 双指中心点 - 当前缩放值 * 双指中心点 = 双指中心点 *（1-当前缩放值）
    x = center.x * (1 - currentScale)
    y = center.y * (1 - currentScale)

    // 设置transform
    el.style.transform = 'translateX(' + x + 'px)' + 'translateY(' + y + 'px)' + 'scale(' + currentScale + ')'
  })
  // 监听滑动事件
  hammer.on('panright panleft panup pandown', e => {
    // 滑动时：偏移量 = 滑动距离 + 当前偏移量
    let translateX = e.deltaX + x,
      translateY = e.deltaY + y
    // 如果偏移X值大于0：表示视图已经滑到最左侧，重置为0
    if (translateX > 0) {
      translateX = 0
    }
    // 如果偏移Y值大于0：表示视图已经滑到最顶部，重置为0
    if (translateY > 0) {
      translateY = 0
    }
    // 如果偏移X值小于（屏幕宽度-元素宽度）：表示视图已经滑到最左侧，重置为0
    // 屏幕宽度 = el.clientWidth
    // 元素宽度 = el.getBoundingClientRect().width
    if (translateX < el.clientWidth - el.getBoundingClientRect().width) {
      translateX = el.clientWidth - el.getBoundingClientRect().width
    }
    // 如果偏移Y值大于（屏幕高度-元素高度）：表示视图已经滑到最左侧，重置为0
    // 屏幕高度 = el.clientHeight
    // 元素高度 = el.getBoundingClientRect().height
    if (translateY < el.clientHeight - el.getBoundingClientRect().height) {
      translateY = el.clientHeight - el.getBoundingClientRect().height
    }
    // 设置transform
    el.style.transform =
      'translateX(' + translateX + 'px)' + 'translateY(' + translateY + 'px)' + 'scale(' + currentScale + ')'
  })
  hammer.on('panend', e => {
    // 滑动结束：记录当前偏移量
    x = e.deltaX + x
    y = e.deltaY + y
    console.log('panendx:' + x)
    console.log('panendy:' + y)
  })
}
