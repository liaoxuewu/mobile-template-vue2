<template>
  <div class="tab-Info">
    <van-tabbar v-model="num" active-color="#1da4f2" inactive-color="#999" placeholder>
      <van-tabbar-item v-for="(item, index) in urls" :key="index" @click="goToPage(item.url, index)">
        <span v-text="item.name"></span>
        <template #icon="props">
          <img v-if="index == num" :src="require('../../../assets/img/tab_' + item.iconName + '_active.png')" />
          <img v-else :src="require('../../../assets/img/tab_' + item.iconName + '.png')" />
        </template>
      </van-tabbar-item>
      <!-- 更多菜单弹窗 -->
      <div class="pops pops-more" v-if="moreMenuShow">
        <ul class="pops-ul" v-for="item in moreMenu" :key="item.id" @click="showPage(item.id)">
          <li :id="item.id" v-text="item.name"></li>
        </ul>
      </div>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'g-tabbar',
  data() {
    return {
      urls: [
        { iconName: 'index', name: '首页', url: '' },
        { iconName: 'detail', name: '详情', url: '' },
        { iconName: 'user', name: '个人中心', url: '/user/User' },
        { iconName: 'more', name: '更多', url: '' }
      ],
      num: 0,
      moreMenu: [{ id: 0, name: '' }],
      moreMenuShow: false
    }
  },
  props: {
    active: {
      default: '',
      type: String
    }
  },
  mounted() {
    this.urls.forEach((item, index) => {
      if (item.name == this.active) {
        this.num = index
      }
    })
  },
  methods: {
    goToPage(url) {
      if (url) {
        this.$router.push(url)
      } else {
        this.moreMenuShow = !this.moreMenuShow
      }
    },
    showPage(id) {
      switch (id) {
        case 0:
          this.$router.push('')
          break
        case 1:
          this.$router.push('')
          break
      }
    }
  }
}
</script>

<style type="text/css">
.van-tabbar-item__icon img {
  width: 30px;
  height: 30px;
}

.pops-more {
  width: 20vw;
  position: absolute;
  right: 5px;
  bottom: 8vh;
}

.pops-ul {
  background: #fff;
  /*border: 1px solid #C3C4C4;*/
  text-align: center;
  font-size: 16px;
}

.pops-ul li {
  color: #838383;
  margin: 5px 0 5px 0;
}
</style>
