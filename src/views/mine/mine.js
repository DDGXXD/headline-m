import { mapState, mapActions } from 'vuex'
export default {
  name: 'Mine',
  data() {
    return {
      navList: [
        { text: '收藏', name: 'star-o', color: 'red' },
        { text: '历史', name: 'clock-o', color: '#ffc107' },
        { text: '作品', name: 'edit', color: '#0093e6' }
      ],
      routerList: [
        { title: '消息通知', to: '/message' },
        { title: '实名认证', to: '/' },
        { title: '用户反馈', to: '/userfeedback' },
        { title: '小智同学', to: '/airobot' },
        { title: '系统设置', to: '/' }
      ]
    }
  },
  computed: {
    ...mapState('mine', ['profile']),
    infoList() {
      return [
        { text: '动态', num: this.profile.follow_count },
        { text: '关注', num: this.profile.fans_count },
        { text: '粉丝', num: this.profile.art_count }
      ]
    }
  },
  mounted() {
    this.upDateUserProfile()
  },
  methods: {
    ...mapActions('mine', ['upDateUserProfile']),
    // 退出按钮
    singOut() {
      localStorage.removeItem('TOKEN')
      this.$router.push('/login')
    },
    onclick(item) {
      console.log(item)
    }
  }
}
