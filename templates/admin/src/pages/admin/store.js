const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {}
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.user = userInfo
    },
    LOGOUT(state) {
      state.user = {}
    }
  },
  actions: {
    async init({ commit }) {
      const body = await $fetch.get('user').catch(() => undefined)
      if (body === undefined) return false

      body.admin && commit('SET_USER_INFO', body)
      return true
    },
    async logout({ commit }) {
      const body = await $fetch.delete('session').catch(error => throw error)
      if (body === undefined) return false

      commit('LOGOUT')
      return true
    }
  }
})

export default store

