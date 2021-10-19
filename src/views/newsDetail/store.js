import * as api from '@/api/news'
export default {
  namespaced: true,
  state: {
    allDiscuss: [],
    total_count: '',
    discussReplyData: []
  },
  mutations: {
    DISCUSSDATA(state, newVal) {
      state.allDiscuss = newVal.data.results
    },
    UPDATA_DISCUSS(state, newVal) {
      state.allDiscuss.push(newVal.data.new_obj)
    },
    // 对评论 经行 评论
    DISCUSS_REPLYDATA(state, newVal) {
      state.discussReplyData = newVal.data.results
    }
  },
  actions: {
    async getNewsDiscuss(context, params) {
      const { data: res } = await api.getNewsDiscussAxios(params)
      context.commit('DISCUSSDATA', res)
    },
    // 发送评论
    async sendDiscussAction(context, params) {
      const { data: res } = await api.sendNewsDiscussAxios(params)
      context.commit('UPDATA_DISCUSS', res)
    },
    // 获取全部评论
    async getNewsDiscussReply(context, params) {
      const { data: res } = await api.getNewsDiscussAxios(params)
      context.commit('DISCUSS_REPLYDATA', res)
    },
    // 点赞评论
    async sendLike(context, params) {
      await api.sendNewsDiscussReply(params)
    },
    // 取消对 评论点赞
    async cancleLike(context, params) {
      await api.sendCancleLike(params)
    },
    // 对文章 点赞
    async likeArticle(context, params) {
      await api.sendLikeArticle(params)
    },
    // 取消对文章点赞
    async cancleLikeArticle(context, params) {
      await api.cancleLikeAeticle(params)
    },
    // 文章 收藏
    async collectArticle(context, params) {
      await api.OnArticleCollect(params)
    },
    // 取消 文章 收藏
    async cancleCollectArticle(context, params) {
      await api.cancleArticleCollect(params)
    }
  },
  getters: {
  }
}
