<template>
  <div class="index-container">
    <div class="index-search">
      <!-- <van-icon name="arrow-left" /> -->
      <div style="width: 100%">
        <van-search
          v-model="searchText"
          @input="searchFun(searchText)"
          placeholder="请输入搜索关键词"
          background="#33b8ff"
        />
      </div>
      <van-icon name="ellipsis" @click="menuShow = true" />
    </div>
    <van-pull-refresh v-model="isShowLoading" @refresh="onRefresh" v-if="dataList.length">
      <ul class="index-content">
        <li v-for="(item, index) in dataList" :key="index" @click="goToDetail(item)">
          <div>姓名：{{ item.name }}</div>
          <div>年龄：{{ item.age }}</div>
          <div>首页A</div>
        </li>
      </ul>
    </van-pull-refresh>
    <g-empty v-else style="margin-top: 50%"></g-empty>
    <!-- 菜单弹窗 -->
    <div class="pops" v-if="menuShow">
      <div class="pop-bg" @click="menuShow = false"></div>
      <ul class="pop pop-menu" style="text-align: center">
        <li @click="tabShow = true">切换</li>
        <li @click="clickPop">操作人</li>
      </ul>
    </div>
    <van-popup class="operate-info" v-model="isShowPersonInfo">
      <div class="operate-info-item">
        工号：<span>{{ userInfo.id }}</span>
      </div>
      <div class="operate-info-item">
        姓名：<span>{{ userInfo.name }}</span>
      </div>
    </van-popup>
    <van-action-sheet
      v-model="tabShow"
      :actions="areaList"
      @select="selectArea"
      cancel-text="取消"
      description="选择项目"
    />
    <van-loading type="spinner" class="van-loading-control" v-if="isShowLoading"></van-loading>
  </div>
</template>

<script>
import config from '../../../public/config'
export default {
  name: 'indexA',
  data() {
    return {
      isShowLoading: false,
      searchText: '', // 搜索内容
      menuShow: false, // 菜单是否显示
      appId: '',
      userInfo: {
        id: '',
        name: ''
      },
      tabShow: false,
      isShowPersonInfo: false, // 操作人信息弹窗
      areaList: [],
      dataList: [],
      imgIndex: 0
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
    selectArea() {},
    /**
     * 搜索函数
     */
    searchFun(content) {
      const baseParams = {}
    },
    /**
     * @description: 获取数据
     * @return list
     */
    getDataList() {
      this.dataList = [
        { name: '曹操', age: 18 },
        { name: '刘备', age: 16 }
      ]
    },
    /**
     * 刷新获取数据
     */
    onRefresh() {
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    clickPop() {
      this.isShowPersonInfo = true
    },
    /**
     * 重置
     */
    reset() {},
    /**
     * 跳转详情
     */
    goToDetail() {
      this.$router.push({
        path: '/detail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.index-search {
  position: fixed;
  top: 0;
  width: calc(100% - 20px);
  height: 50px;
  background: #33b8ff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  font-size: 20px;
  z-index: 4;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.index-content {
  overflow: auto;
  margin-top: 55px;
  padding: 0 5px 0 5px;
  li {
    float: left;
    text-align: left;
    width: calc(50% - 8px);
    border-radius: 3px;
    border: 1px solid #ccc;
    margin: 0 0 5px 5px;
    padding: 5px;
    line-height: 20px;
    font-size: 12px;
    p {
      color: #454545;
    }
  }
}

.pop-menu {
  top: 40px;
  right: 5px;
  width: 100px;
  li {
    line-height: 48px;
    font-size: 16px;
    color: #454545;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>

<style>
.index-search .van-search {
  padding: 3px 10px;
}
.operate-info {
  font-size: 18px;
  width: 50%;
  padding: 0 0 5px 5px;
}
.operate-info-item {
  padding: 5px 5px 0 0;
}
</style>
