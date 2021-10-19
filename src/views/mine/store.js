import * as api from '@/api/mine'
export default {
  namespaced: true, // 模块必须有这句话
  state: {
    profile: {
      name: '请登录~~'
    }
  },
  mutations: {
    SET_PROFILE(state, newValue) {
      state.profile = newValue
    }
  },
  actions: {
    async upDateUserProfile(context) {
      const { data: res } = await api.getUserInfo()
      context.commit('SET_PROFILE', res.data)
    }
  }
}
