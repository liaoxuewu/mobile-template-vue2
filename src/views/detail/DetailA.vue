<template>
  <div>
    <van-nav-bar :title="titleName" left-arrow @click-left="goBack" fixed placeholder z-index="99999"> </van-nav-bar>
    <van-pull-refresh v-model="isShowLoading" @refresh="onRefresh" v-if="dataList.length">
      <div>医院A</div>
    </van-pull-refresh>
    <g-empty v-else></g-empty>
  </div>
</template>

<script>
import config from '../../../public/config'
export default {
  name: 'DetailA',
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
      this.isShowLoading = true
      try {
        this.reset()
        this.getDataList()
      } catch (e) {
        console.log(e)
      } finally {
        this.isShowLoading = false
      }
    },
    /**
     * @description: 获取数据
     * @return list
     */
    getDataList() {
      this.dataList = ['1']
    },
    /**
     * 重置
     */
    reset() {},
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
