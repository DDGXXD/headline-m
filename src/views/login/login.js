import { TEL, AUTH_CODE } from '@/conststans/reg'
import * as api from '@/api/login'
import { withMsg } from '@/utils/request'
import { Notify } from 'vant'
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
      this.$router.push('/')
    },
    // 返回按钮
    goBack() {
      // 返回
      this.$router.push('/')
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
      if (this.tel.length !== 11) {
        return Notify({ type: 'primary', message: '请输入正确手机号' })
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
