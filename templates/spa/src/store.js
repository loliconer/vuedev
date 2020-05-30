import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visitors: []
  },
  mutations: {
    setVisitors(_state, rows) {
      _state.visitors = rows
    }
  },
  actions: {

  }
})
