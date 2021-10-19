import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import * as api from '@/api/news'
import 'vue-hljs/dist/style.css'
export default {
  name: 'News',
  data() {
    return {
      loading: false,
      finished: true,
      active: '',
      value: '',
      scollTop: true,
      artcliID: '',
      openDiscussState: false,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      popupItem: {},
      discussInside: '',
      showLoding: true
    }
  },
  mounted() {
    this.artcliID = this.$route.params.p.slice(1)
    this.getNewsInfo(this.artcliID)
    // 获取 评论
    const params = {
      type: 'a',
      source: this.artcliID
    }
    this.getNewsDiscuss(params)
  },
  methods: {
    ...mapActions('news', ['getNewsInfo']),
    ...mapActions('newsDetails',
      ['getNewsDiscuss',
        'sendDiscussAction',
        'getNewsDiscussReply',
        'sendLike',
        'cancleLike',
        'likeArticle',
        'cancleLikeArticle',
        'collectArticle',
        'cancleCollectArticle']),
    onClickLeft() {
      this.$router.push('/')
      // this.$router.go(-1)
    },
    onLoad() {
    },
    // 滚动条 事件
    onScoll(e) {
      if (e.target.scrollTop > 180) {
        this.scollTop = false
      } else if (e.target.scrollTop < 180) {
        this.scollTop = true
      }
    },
    // 时间 格式化
    timeFromat(val) {
      moment.locale('zh-cn')
      return moment(val).format('LL')
    },
    async sendDiscuss() {
      console.log(this.value)
      // const discussText =
      await this.sendDiscussAction({
        target: this.artcliID,
        content: this.value,
        art_id: this.artcliID
      })
      const params = {
        type: 'a',
        source: this.artcliID
      }
      this.getNewsDiscuss(params)
      console.log(this.allDiscuss)
      this.value = ''
    },
    // 展开全部回复
    async openAllDiscuss(id, item) {
      this.showLoding = true
      this.popupItem = item
      this.openDiscussState = true
      await this.getNewsDiscussReply({
        type: 'c',
        source: id
      })
      this.showLoding = false
    },
    // 点赞
    likeClick(item) {
      this.sendLike({ target: item.com_id })
      this.artcliID = this.$route.params.p.slice(1)
      // 获取 评论
      const params = {
        type: 'a',
        source: this.artcliID
      }
      this.getNewsDiscuss(params)
    },
    // 对 评论 的评论点赞
    subLikeClick(id, flag) {
      if (flag === false) {
        this.sendLike({ target: id })
      } else {
        this.cancleLike(id)
      }
      this.getNewsDiscussReply({
        type: 'c',
        source: this.popupItem.com_id
      })
    },
    // 取消点赞
    notlikeClick(item) {
      this.cancleLike(item.com_id)
      const params = {
        type: 'a',
        source: this.artcliID
      }
      this.getNewsDiscuss(params)
    },
    // 底部导航栏点赞
    bottomOnLike() {
      this.likeArticle({ target: this.newsInfo.art_id })
      this.getNewsInfo(this.artcliID)
    },
    // 底部导航栏 取消 点赞
    bottomCancleLike() {
      this.cancleLikeArticle(this.newsInfo.art_id)
      this.getNewsInfo(this.artcliID)
    },
    // 收藏 文章
    onCollect() {
      this.collectArticle({ target: this.newsInfo.art_id })
      this.getNewsInfo(this.artcliID)
    },
    // 取消文章收藏
    cancleCollect() {
      this.cancleCollectArticle(this.newsInfo.art_id)
      this.getNewsInfo(this.artcliID)
    },
    shareOpen() {
      this.showShare = true
      console.log('11')
    },
    // 弹出评论 时间 格式化
    resetTime(val) {
      return moment(val).startOf('hour').fromNow()
    },
    // 对评论 进行评论
    async insideSearch() {
      await api.sendNewsDiscussAxios({
        target: this.popupItem.com_id,
        content: this.discussInside,
        art_id: this.newsInfo.art_id
      })
      this.getNewsDiscussReply({
        type: 'c',
        source: this.popupItem.com_id
      })
    }
  },
  computed: {
    ...mapState('news', ['newsInfo']),
    ...mapState('newsDetails', ['allDiscuss', 'discussReplyData'])
  }
}
