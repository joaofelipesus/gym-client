import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workout_exercises: [],
  },
  mutations: {
    set(state, workout_exercises){
      state.workout_exercises = JSON.stringify(workout_exercises)
    },
    clean_workout_exercises(state){
      state.workout_exercises = []
    },
  },
  actions: {
    set_workout_exercises(context, workout_exercises){
      context.commit("set", workout_exercises)
    },
    clean(context){
      context.commit('clean_workout_exercises')
    }
  },
  getters: {
    workout_exercises(state){
      return JSON.parse(state.workout_exercises)
    },
  },
})
