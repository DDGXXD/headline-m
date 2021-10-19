import * as api from '@/api/newsLIst'
import { withMsg } from '@/utils/request.js'
export default {
  namespaced: true, // 模块必须有这句话
  state: {
    titeData: [],
    recommendData: [],
    searchData: [],
    times: Date.now(),
    searchAutoData: [],
    allChannelData: [],
    userChannelData: [],
    newsInfo: {}
  },
  mutations: {
    SET_titeData(state, newValue) {
      state.titeData = newValue.channels
    },
    SET_RECOMMENDNEWS(state, newValue) {
      state.times = newValue.pre_timestamp
      state.recommendData = newValue.results
    },
    SET_SEARCHDATA(state, newValue) {
      state.searchData = newValue.results
    },
    SET_SARCHAUTO(state, newValue) {
      state.searchAutoData = newValue.data.options
    },
    // 所有频道
    SET_ALLCHANNELDARA(state, newValue) {
      state.allChannelData = newValue.data.channels
    },
    // 用户频道
    SET_USERCHANNELDARA(state, newValue) {
      if (!newValue.data.channels) {
        return
      }
      state.userChannelData = newValue.data.channels
    },
    // 每一个新闻详情
    SET_NEWSINFO(state, newValue) {
      state.newsInfo = newValue.data
    }
  },
  actions: {
    // 顶部 tabs
    async getNewsData(context) {
      const { data: res } = await withMsg(api.getUserNews())
      context.commit('SET_titeData', res.data)
    },
    // main新闻列表
    async getRecommendNews(context, params) {
      context.commit('SET_RECOMMENDNEWS', [])
      const { data: res } = await withMsg(api.getNewsRecommend(params))
      context.commit('SET_RECOMMENDNEWS', res.data)
    },
    // 搜索
    async getSearchData(context, params) {
      const { data: res } = await withMsg(api.getSearchAxios(params))
      context.commit('SET_SEARCHDATA', res.data)
    },
    // 搜索补全
    async getSearchAutoAxios(context, params) {
      const { data: res } = await withMsg(api.getSearchAuto(params))
      context.commit('SET_SARCHAUTO', res)
    },
    // 所有频道
    async getAllChannel(context) {
      const { data: res } = await withMsg(api.getAllChannelAxios())
      context.commit('SET_ALLCHANNELDARA', res)
    },
    // 用户频道
    async getUserChannel(context) {
      const { data: res } = await withMsg(api.getUserChannelAxios())
      context.commit('SET_USERCHANNELDARA', res)
    },
    // 删除指定 用户频道
    async deleteUserChannel(context, id) {
      console.log(id)
      await api.deleteUserChannelAxios(id)
    },
    async addUserChennels(context, params) {
      await api.addUserChannelAxios(params)
    },
    // 获取新闻详情
    async getNewsInfo(context, params) {
      const { data: res } = await api.getNewsInfoAxios(params)
      context.commit('SET_NEWSINFO', res)
    }
  },
  getters: {
    filerAllCHannels(state) {
      return state.allChannelData.filter(item => {
        return !state.userChannelData.some(it => it.id === item.id)
      })
    }
  }
}
