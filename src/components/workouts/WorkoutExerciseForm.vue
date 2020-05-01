<template>
  <div class="card">
    <header class="card-header has-background-primary">
      <p class="card-header-title has-text-white">Adicionar exercícios</p>
    </header>
    <div class="card-content">
      <form @submit.prevent="add_exercise">
        <span id="exercise-error-message" class="has-text-danger">
          {{ exercise_error_message }}
        </span>
        <div class="field">
          <label>Exercício</label>
          <div class="select">
            <select v-model="exercise_id">
              <option v-for="exercise in exercises" :key="exercise.id" v-bind:value="exercise.id">
                {{ exercise.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Número de séries</label>
          <input v-model="series_number" id="series-number" type="number" required/>
        </div>
        <div class="field">
          <label>Repetições</label>
          <input v-model="repetitions" id="repetitions" type="number" required/>
        </div>
        <div class="field">
          <label>Tempo de descanço</label>
          <input v-model="rest_time" type="number" id="rest-time" placeholder="Tempo em segundos" required/>
        </div>
        <button id="btn-add-exercise" class="button is-primary">
          Adicionar
        </button>
      </form>
    </div>
    <div v-show="render_exercise_list" class="card-content">
      <div v-for="(workout_exercise, index) in workout_exercises" :key="workout_exercise.exercise.id" class="card exercise-card">
        <header @click.prevent="expand_workout_exercise_card(index)" class="card-header exercise">
          <p class="card-header-title">
            {{ workout_exercise.exercise.name }}
            <font-awesome-icon icon="angle-down" class="has-text-primary is-size-4" style="margin-left: 2%;" />
          </p>
        </header>
        <div style="overflow: auto;" class="card-content" :class="display_exercise_list[index]">
          <p>Número de séries: {{ workout_exercise.series_number }}</p>
          <p>Repetições: {{ workout_exercise.repetitions }}</p>
          <p>Tempo de descanço: {{ workout_exercise.rest_time }}</p>
          <button @click.prevent="remove_workout_exercise(index)" class="button is-danger is-pulled-right is-small remove-exercise">
            Remover
          </button>
        </div>
      </div>
    </div>  
  </div>
</template>

<style lang="scss" scoped>
  @import "bulma";
  label{
    @extend .label;
  }
  input{
    @extend .input;
  }
  .select{
    width: 100%;
  }
  select{
    width: 100%;
  }
  .card{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4%;
  }
</style>

<script>
import store from '../../store/workout_exercise_store'
import ExerciseService from '../../services/ExerciseService'
export default {
  data(){
    return {
      series_number: '',
      rest_time: '',
      repetitions: '',
      workout_exercises: [],
      display_exercise_list: [],
      exercises: [],
      exercise_id: '',
      exercise_error_message: '',
    }
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
      this.error = error.response.data.errors
    })
    store.subscribe((mutation) => {
      if (mutation.type == 'clean_workout_exercises'){
        this.workout_exercises = []
        this.display_exercise_list = []
      }
    })
  },
  methods: {
    add_exercise(){
      if (this._already_have_workout_exercise()){
        this.exercise_error_message = 'O exercício selecionado já está presente neste treino.'
      } else {
        this.exercise_error_message = ''
        let exercise = this.exercises.find(exercise => exercise.id == this.exercise_id)
        let workout_exercise = {
          exercise: exercise,
          rest_time: this.rest_time,
          repetitions: this.repetitions,
          series_number: this.series_number,
        }
        this.workout_exercises.push(workout_exercise)
        this._clean_exercise_fields()
        this.display_exercise_list.push('is-hidden')
        store.dispatch('set_workout_exercises', this.workout_exercises)
      }      
    },
    expand_workout_exercise_card(index){
      if(this.display_exercise_list[index] == ''){
        this.$set(this.display_exercise_list, index, 'is-hidden');
      }else{
        this.$set(this.display_exercise_list, index, '');
      }
    },
    _already_have_workout_exercise(){
      let curren_exercise_id = this.workout_exercises.find(workout_exercise => workout_exercise.exercise.id == this.exercise_id)
      if(curren_exercise_id)
        return true
      else
        return false
    },
    remove_workout_exercise(index){
      this.workout_exercises.splice(index, 1)
      this.display_exercise_list.splice(index, 1)
      store.dispatch('set_workout_exercises', this.workout_exercises)
    },
    _clean_exercise_fields(){
      this.rest_time = ''
      this.repetitions = ''
      this.exercise_id = this.exercises[0].id
      this.series_number = ''
    },
  },
  computed: {
    render_exercise_list(){
      if (this.workout_exercises.length > 0) return true
      return false
    },
  }
}

</script>