import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    success_message: '',
    has_success_message: false 
  },
  mutations: {
    add_success_message(context, message){
      context.success_message = message
      context.has_success_message = true
    },
    remove_success_message(context){
      context.success_message = ''
      context.has_success_message = false
    }
  },
  actions: {
    add_message(context, message){
      context.commit('add_success_message', message)
    },
    remove_message(context){
      context.commit('remove_success_message')
    }
  },
  modules: {
  },
  getters: {
    has_message(state){
      return state.has_success_message
    },
    message(state){     
      return state.success_message
    }
  }
})
