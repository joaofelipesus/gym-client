import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authentication_token: ""
  },
  mutations: {
    new_session(state, user, token){
      state.authentication_token = token
      state.user = JSON.stringify(user)
      localStorage.setItem('authentication_token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    load_session(state){
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    finish_session(state){
      state.authentication_token = ''
      state.user = ''
      localStorage.removeItem('authentication_token')
      localStorage.removeItem('user')
    }
  },
  actions: {
    authenticate(context, user){
      context.commit("new_session", user)
    },
    session(context){
      context.commit("load_session")
    },
    logout(context){
      context.commit('finish_session')
    }
  },
  getters: {
    has_session(state){
      if(state.user) return true;
      return false;
    },
    user(state){
      return state.user
    }
  }
})
