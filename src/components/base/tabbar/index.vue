<template>
  <div class="tab-Info">
    <van-tabbar v-model="num" active-color="#1da4f2" inactive-color="#999" placeholder>
      <van-tabbar-item v-for="(v, i) in urls" :key="i" @click="goToPage(v.url, i)">
        <span v-text="v.name"></span>
        <template #icon="props">
          <img v-if="i == num" :src="require('../../../assets/img/tab_' + v.iconname + '_active.png')" />
          <img v-else :src="require('../../../assets/img/tab_' + v.iconname + '.png')" />
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
        { iconname: '', name: '', url: '' },
        { iconname: 'more', name: '更多', url: '' }
      ],
      num: 0,
      moreMenu: [
        { id: 0, name: '' },
      ],
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
    let that = this
    let v = this.active
    this.urls.forEach(function (x, i) {
      if (x.name == v) {
        that.num = i
      }
    })
  },
  methods: {
    goToPage(v) {
      if (v) {
        this.$router.push(v)
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
