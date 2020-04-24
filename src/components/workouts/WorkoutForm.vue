<template>
  <div id="new-workout-form">
    <div id="workout-div" :class="display_workout_form">
      <div class="panel is-info">
        <p class="panel-heading">Novo treino</p>
        <div class="panel-block">
          <form @submit.prevent="save_workout">
            <div class="field">
              <label class="label">Nome</label>
              <input v-model="name" class="input" placeholder="Braço, Perna, A, B, C" required/>
            </div>
            <div class="field">
              <label class="label">Número de aulas</label>
              <input v-model="classes_to_attend" class="input" placeholder="20" type="number" required/>
            </div>
            <div class="field">
              <div class="card">
                <header class="card-header has-background-primary">
                  <p class="card-header-title has-text-white">Adicionar exercícios</p>
                </header>
                <div class="card-content">
                  <form @submit.prevent="add_exercise">
                    <span class="has-text-danger">
                      {{ exercise_error_message }}
                    </span>
                    <div class="field">
                      <label class="label">Exercício</label>
                      <div class="select">
                        <select v-model="exercise_id">
                          <option v-for="exercise in exercises" :key="exercise.id" v-bind:value="exercise.id">
                            {{ exercise.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Repetições</label>
                      <input v-model="repetitions" class="input" type="number" required/>
                    </div>
                    <div class="field">
                      <label class="label">Tempo de descanço</label>
                      <input v-model="rest_time" class="input" type="number" placeholder="Tempo em segundos" required/>
                    </div>
                    <button class="button is-primary">
                      Adicionar
                    </button>
                  </form>
                </div>
                <div v-show="render_exercise_list" class="card-content">
                  <div v-for="(workout_exercise, index) in workout_exercises" :key="workout_exercise.exercise.id" class="card">
                    <header @click.prevent="expand_workout_exercise_card(index)" class="card-header">
                      <p class="card-header-title">
                        {{ workout_exercise.exercise.name }}
                        <font-awesome-icon icon="angle-down" class="has-text-primary is-size-4" style="margin-left: 2%;" />
                      </p>
                    </header>
                    <div style="overflow: auto;" class="card-content" :class="display_exercise_list[index]">
                      <p>Repetições: {{ workout_exercise.repetitions }}</p>
                      <p>Tempo de descanço: {{ workout_exercise.rest_time }}</p>
                      <button @click.prevent="remove_workou_exercise(index)" class="button is-danger is-pulled-right is-small">
                        Remover
                      </button>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
            <button class="button is-info">
              Concluir
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #workout-div{
    margin-top: 2%;
  }
</style>

<script>
import training_routine_store from '../../store/training_routine_store'
import store from '../../store/workout_store'
import ExerciseService from '../../services/ExerciseService'
import WorkoutService from '../../services/WorkoutService'
export default {
  data(){    
    return {
      display_workout_form: 'is-hidden',
      name: '',
      classes_to_attend: '',
      rest_time: '',
      repetitions: '',
      workout_exercises: [],
      display_exercise_list: [],
      exercises: [],
      exercise_id: '',
      exercise_error_message: ''
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
      this.exercise_id = this.exercises[0].id
    }).catch(error => {
      console.log(error);
    })
    store.subscribe((mutation) => {
      if (mutation.type == 'display_workout_form'){
        this.display_workout_form = store.getters['workout_form_status']
      } else if( mutation.type == 'set_workout') {
        this.display_workout_form = 'is-hidden'
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
          repetitions: this.repetitions
        }
        this.workout_exercises.push(workout_exercise)
        this._clean_exercise_fields()
        this.display_exercise_list.push('is-hidden')
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
    remove_workou_exercise(index){
      this.workout_exercises.splice(index, 1)
      this.display_exercise_list.splice(index, 1)
    },
    save_workout(){
      let workout_exercises_attributes = this.workout_exercises.map(workout_exercise => {
        return {
          exercise_id: workout_exercise.exercise.id,
          repetitions: workout_exercise.repetitions,
          rest_time: workout_exercise.rest_time
        }
      })
      let workout = {
        name: this.name,
        classes_to_attend: this.classes_to_attend,
        workout_exercises_attributes: workout_exercises_attributes,
        training_routine_id: JSON.parse(training_routine_store.getters['training_routine']).id
      }
      WorkoutService.create(workout).then(response => {
        this._clean_workout_fields()
        store.dispatch('add_workout', response.data)
      }).catch(error => {
        console.log(error);
      })
    },
    _clean_exercise_fields(){
      this.rest_time = ''
      this.repetitions = ''
      this.exercise_id = this.exercises[0].id
    },
    _clean_workout_fields(){
      this.name = ''
      this.classes_to_attend = ''
      this.workout_exercises = []
    }
  },
  computed: {
    render_exercise_list(){
      if (this.workout_exercises.length > 0) return true
      return false
    },
  }
}
</script>