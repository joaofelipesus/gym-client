import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workout_form_status: 'is-hidden',
    workouts: [],
    display_new_workout_modal: ''
  },
  mutations: {
    display_workout_form(state){
      state.workout_form_status = ''
    },
    set_workout(state, workout){
      let workouts = state.workouts
      workouts.push(workout)
      state.workouts = JSON.stringify(workouts)
      state.display_new_workout_modal = 'is-active'
      state.workout_form_status = 'is-hidden'
    }
  },
  actions: {
    display_workout_form(context){
      context.commit("display_workout_form")
    },
    add_workout(context, workout){
      context.commit('set_workout', workout)
    }
  },
  getters: {
    workout_form_status(state){
      return state.workout_form_status
    },
    display_new_workout_modal(state){
      return state.display_new_workout_modal
    }
  }
})
