import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { debounce } from '@/utils/index'
import { Dialog } from 'vant'
export default {
  name: 'News',
  data() {
    return {
      // 搜索框
      searchVale: '',
      // tbsid
      activeName: '',
      timestamp1: Date.parse(new Date()),
      loading: false,
      finished: false,
      show: false,
      refreshing: '',
      Autoshow: false,
      iconShow: false,
      channelsIcon: false,
      btnShow: true
    }
  },
  computed: {
    ...mapState('news', [
      'titeData',
      'recommendData',
      'searchData',
      'times',
      'searchAutoData',
      'allChannelData',
      'userChannelData']),
    ...mapGetters('news', ['filerAllCHannels'])
  },
  async mounted() {
    // 页面初始化
    // 1.tabs 新闻分类
    await this.getNewsData()
    // 2. 推荐新闻列表
    this.getRecommendNews({
      channel_id: this.activeName,
      timestamp: this.timestamp1
    })
    this.getUserChannel()
  },
  methods: {
    ...mapActions('news', [
      'getNewsData',
      'getRecommendNews',
      'getSearchData',
      'getSearchAutoAxios',
      'getAllChannel',
      'getUserChannel',
      'deleteUserChannel',
      'addUserChennels',
      'getNewsInfo'
    ]),
    changeTabs: debounce(async function (name) {
      this.getRecommendNews({
        channel_id: name,
        timestamp: this.times
      })
    }),
    timeFromNow(val) {
      moment.locale('zh-cn')
      return moment(val, 'YYYYMMDD').fromNow()
    },
    // list组件 onlad事件
    onLoad() {
      this.finished = true
    },
    // 搜索
    onSearch: debounce(async function () {
      this.Autoshow = false
      // 搜索
      if (this.searchVale === '') {
        return
      }
      await this.getSearchData({ q: this.searchVale })
      this.show = true
    }),
    onRefresh: debounce(async function () {
      this.getRecommendNews({
        channel_id: this.activeName,
        timestamp: this.times
      })
      this.refreshing = false
    }),
    searchAuto: debounce(async function () {
      if (this.searchVale === '') {
        this.Autoshow = false
        return
      }
      // this.Autoshow = true
      // 搜索自动 补全
      this.getSearchAutoAxios({ q: this.searchVale })
    }),
    recommendbtn(e) {
      this.Autoshow = false
      console.log(e.target.innerText)
      this.searchVale = e.target.innerText
      this.onSearch()
    },
    iconClick() {
      this.iconShow = true
      // 3.获取所有频道
      this.getAllChannel()
      this.getUserChannel()
    },
    // 删除 获取
    userChennel(id) {
      this.deleteUserChannel(id)
      this.getUserChannel()
    },
    // 添加
    addChennels(id) {
      const bl = this.userChannelData.find(item => {
        return item.id === id
      })
      if (bl) {
        Dialog.alert({
          title: '提示',
          message: '你已经有重复的频道了~~~'
        }).then(() => {
          // on close
        })
        return
      }
      const params = {
        id: id,
        seq: this.userChannelData.length
      }
      this.addUserChennels(params)
      this.getUserChannel()
    },
    // 点击编辑按钮
    editClick() {
      this.channelsIcon = true
      this.btnShow = false
    },
    // 点击完成按钮
    successClick() {
      this.channelsIcon = false
      this.btnShow = true
    },
    toChannels(id, $event) {
      this.iconShow = false
      console.log($event)
      this.changeTabs(id)
      this.activeName = id
    },
    recommendNewsClick(id) {
      this.getNewsInfo(id)
      this.$router.push(`/news/:${id}`)
    }
  },
  // 侦听 input 事件
  watch: {
    searchVale(newVal) {
      this.Autoshow = !!newVal
    }
  }
}
