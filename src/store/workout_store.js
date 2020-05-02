import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    display_new_workout_modal: ''
  },
  mutations: {
    display_modal(state){
      state.display_new_workout_modal =  'is-active'
    }
  },
  actions: {
    
    new_workout_modal(context){
      context.commit('display_modal')  
    }
  },
  getters: {
    display_new_workout_modal(state){
      return state.display_new_workout_modal
    }
  }
})
