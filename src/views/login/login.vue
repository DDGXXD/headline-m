<template>
  <div class="login">
    <van-nav-bar
      title="标题"
      left-arrow
    />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field
      icon-prefix="iconfont icon-shouji"
      v-model="tel"
      type="tel"
      label="手机号"
      left-icon="icon-shouji"
    />
    <!-- 输入密码 -->
    <van-field
      v-model="password"
      icon-prefix="iconfont icon-yanzhengma1"
      class="iconfont"
      type="password"
      label="密码"
      left-icon="icon-yanzhengma1"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      password: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
