import Vue from 'vue'
import Vuex from 'vuex'
import saveInLocal from './plugins/saveInLocal'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    include: [],
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setinclude(state, payload) {
      state.include = payload
    },
  },
  actions: {
    saveUserInfo(context, payload) {
      context.commit('setUserInfo', payload)
    },
    saveinclude(context, payload) {
      context.commit('setinclude', payload)
    },
  },
  modules: {
  },
  plugins: [saveInLocal]
})
