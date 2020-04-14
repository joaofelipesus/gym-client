import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    new_session(state, user){
      state.user = JSON.stringify(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    load_session(state){
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    finish_session(state){
      state.user = ''
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
    },
    headers(state){
      return { 
        'X-User-Email': state.user.email, 
        'X-User-Token': state.user.authentication_token, 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      }
    }

  }
})
