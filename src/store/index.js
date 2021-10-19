import Vue from 'vue'
import Vuex from 'vuex'
import mine from '@/views/mine/store'
import news from '@/views/homPage/main/store'
import newsDetails from '@/views/newsDetail/store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mine,
    news,
    newsDetails
  }
})
