<template>
  <div>
    <van-nav-bar :title="titleName" left-arrow @click-left="goBack" fixed placeholder z-index="99999"> </van-nav-bar>
    <van-pull-refresh v-model="isShowLoading" @refresh="onRefresh" v-if="dataList.length">
    </van-pull-refresh>
    <g-empty v-else></g-empty>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Detail',
  data() {
    return {
      titleName: '详情',
      isShowLoading: false,
      dataList: []
    }
  },
  mounted() {
    this.appId = config.appId
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      const _toast = Toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      try {
        this.reset()
        this.getDataList()
      } catch (e) {
        Toast.fail(e)
      } finally {
        _toast.clear()
      }
    },
    /**
     * @description: 获取数据
     * @return list
     */
    getDataList() {},
    /**
     * 刷新获取数据
     */
    onRefresh() {
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    /**
     * 返回
     */
    goBack() {
      this.$router.back(-1)
      // this.$router.push('/')
    }
  }
}
</script>

<style scoped></style>
