<template>
  <div>
    <button @click="exitSystem">退出登陆</button>
    <g-tabbar :active="activeName"></g-tabbar>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      activeName: '个人中心'
    }
  },
  methods: {
    exitSystem() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped></style>
