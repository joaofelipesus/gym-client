import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workout_form_status: 'is-hidden',
  },
  mutations: {
    display_workout_form(state){
      state.workout_form_status = ''
    },
  },
  actions: {
    display_workout_form(context){
      context.commit("display_workout_form")
    },
  },
  getters: {
    workout_form_status(state){
      return state.workout_form_status
    },
  }
})
