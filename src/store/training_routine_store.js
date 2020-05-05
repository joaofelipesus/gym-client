import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    training_routine: null,
  },
  mutations: {
    set_training_routine(state, training_routine){
      state.training_routine = JSON.stringify(training_routine)
      localStorage.setItem('training_routine', JSON.stringify(training_routine))
    },
    complete_training_routine(state){
      state.training_routine = null
      localStorage.removeItem('training_routine')
    }
  },
  actions: {
    add_training_routine(context, training_routine){
      context.commit("set_training_routine", training_routine)
    },
    complete(context){
      context.commit('complete_training_routine')
    },
  },
  getters: {
    training_routine(state){
      if (state.training_routine != null)
        return state.training_routine
      else
        return localStorage.getItem('training_routine')
    },
  }
})
