<template>
  <div>
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      route
    >
      <van-tabbar-item
        icon="wap-home-o"
        replace
        to="/"
      >首页</van-tabbar-item>
      <van-tabbar-item
        icon="question-o"
        badge="9"
        replace
        to="/qa"
      >问答</van-tabbar-item>
      <van-tabbar-item
        icon="video-o"
        replace
        to="/video"
      >视频</van-tabbar-item>
      <van-tabbar-item
        icon="manager-o"
        replace
        to="/mine"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      active: ''
    }
  }
}
</script>

<style>
</style>
