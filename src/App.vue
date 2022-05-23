<template>
  <div id="app">
    <g-header v-if="$route.meta.showHeader"></g-header>
    <!--默认视图区-->
    <!--要缓存的-->
    <keep-alive>
      <router-view class="view-router" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--不要缓存的-->
    <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    <!--默认视图区 end-->

    <!--需要显示tabbar的界面，需要在路由信息中components设置对应的组件-->
    <router-view name="tabbar"></router-view>
  </div>
</template>

<script></script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #f6f6f6;
  /*margin-top: 60px;*/
}
</style>
