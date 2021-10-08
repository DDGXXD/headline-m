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
        v-model="tel"
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
        v-model="AuthCode"
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

<script>
import { TEL, AUTH_CODE } from '@/conststans/reg'
import * as api from '@/api/login'
import { withMsg } from '@/utils/request'
export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      AuthCode: '',
      sending: false,
      delday: 60,
      sedText: '发送验证码'
    }
  },
  methods: {
    // 登录 提交
    async onSubmit(val) {
      // 提交
      const { data: res } = await withMsg(api.login(val))
      localStorage.setItem('TOKEN', `Bearer ${res.data.token}`)
    },
    // 返回按钮
    goBack() {
      // 返回
    },
    // 校验手机规则
    isTel(val) {
      return TEL.test(val)
    },
    // 验证码规则
    isAUTH_CODE(val) {
      return AUTH_CODE.test(val)
    },
    // 发送验证码
    async sendAuthCode() {
      if (this.tel === '') {
        return alert('请填写手机号~~~')
      }
      this.sending = true
      const coutDown = () => {
        this.delday--
        this.sedText = this.delday + '后可重新获取'
      }
      coutDown()
      const timer = setInterval(coutDown, 1000)
      setTimeout(() => {
        this.sending = false
        this.sedText = '发送验证码'
        clearInterval(timer)
      }, 60000)
      await withMsg(api.sendAuthCode(this.tel))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
