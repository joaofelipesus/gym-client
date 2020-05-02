<template>
  <div id="new-workout-form">
    <UserNavbar />
    <NewWorkoutModal />
    <div id="workout-div">
      <div class="panel is-info">
        <p class="panel-heading">Novo treino</p>
        <div class="panel-block">
          <form @submit.prevent="save_workout">
            <span id="error-message" class="has-text-danger"> {{ error }} </span>
            <div class="field">
              <label>Nome</label>
              <input v-model="name" id="name" placeholder="Braço, Perna, A, B, C" required/>
            </div>
            <div class="field">
              <label>Número de aulas</label>
              <input v-model="classes_to_attend" id="classes-to-attend" placeholder="20" type="number" required/>
            </div>
            <WorkoutExerciseForm />
            <button id="btn-save" class="button is-info">
              Concluir
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "bulma";
  #workout-div{
    margin-top: 2%;
  }
  label{
    @extend .label;
  }
  input{
    @extend .input;
  }
</style>

<script>

import training_routine_store from '../../store/training_routine_store'
import store from '../../store/workout_store'
import ExerciseService from '../../services/ExerciseService'
import WorkoutService from '../../services/WorkoutService'
import UserNavbar from '../../components/navbars/UserNavbar'
import WorkoutExerciseForm from '../../components/workouts/WorkoutExerciseForm'
import workout_exercise_store from '../../store/workout_exercise_store'
import NewWorkoutModal from '../../components/workouts/NewWorkoutModal'
export default {
  data(){    
    return {
      name: '',
      classes_to_attend: '',
      workout_exercises: [],
      error: ''
    }
  },
  components: {
    UserNavbar,
    WorkoutExerciseForm,
    NewWorkoutModal,
  },
  created (){
    ExerciseService.fetch_active().then(response => {
      this.exercises = response.data.exercises.map(exercise => {
        return {
          id: exercise.id,
          name: exercise.name
        }
      })
      if (this.exercises.length > 0)
        this.exercise_id = this.exercises[0].id
    }).catch(error => {      
      console.log(error);
      this.error = error.response.data.errors
    })
    workout_exercise_store.subscribe(mutation => {
      if(mutation.type == 'set'){
        this.workout_exercises = workout_exercise_store.getters['workout_exercises']
      }
    })
  },
  methods: {
    save_workout(){
      let workout_exercises_attributes = this.workout_exercises.map(workout_exercise => {
        return {
          exercise_id: workout_exercise.exercise.id,
          repetitions: workout_exercise.repetitions,
          rest_time: workout_exercise.rest_time,
          series_number: workout_exercise.series_number,
        }
      })
      let workout = {
        name: this.name,
        classes_to_attend: this.classes_to_attend,
        workout_exercises_attributes: workout_exercises_attributes,
        training_routine_id: JSON.parse(training_routine_store.getters['training_routine']).id,
      }
      WorkoutService.create(workout).then(() => {
        this._clean_workout_fields()
        store.dispatch('new_workout_modal')
        this.error = ''
      }).catch(error => {
        console.log(error)
        window.scrollTo(0,0)
        this.error = error.response.data.errors[0]
      })
    },
    _clean_workout_fields(){
      this.name = ''
      this.classes_to_attend = ''
      this.workout_exercises = []
    }
  },
}

</script>