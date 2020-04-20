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
  },
  actions: {
    add_training_routine(context, training_routine){
      context.commit("set_training_routine", training_routine)
    },
  },
  getters: {
    training_routine(state){
      return state.training_routine
    },
  }
})
