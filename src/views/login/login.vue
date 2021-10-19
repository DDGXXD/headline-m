<template>
  <div class="login">
    <van-nav-bar
      title="请登录"
      left-arrow
      @click-left="goBack"
    />
    <van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        icon-prefix="iconfont icon-shouji"
        left-icon="icon-shouji"
        v-model.trim="tel"
        name="mobile"
        label="手机号"
        clearable
        placeholder="输入手机号"
        :rules="[{ validator: isTel, message: '请输入正确内容' }]"
      />
      <!-- 验证码 -->
      <van-field
        autocomplete="off"
        icon-prefix="iconfont icon-yanzhengma1"
        left-icon="icon-yanzhengma1"
        v-model.trim="AuthCode"
        name="code"
        label="验证码"
        clearable
        placeholder="验证码"
        :rules="[{ validator: isAUTH_CODE, message: '请输入正确内容' }]"
      >
        <template #button>
          <van-button
            round
            color="#ccc"
            size="mini"
            type="primary"
            :disabled="sending"
            @click="sendAuthCode"
          >{{ sedText }}</van-button>
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script src="./login.js"></script>

<style lang="less" scoped>
</style>
