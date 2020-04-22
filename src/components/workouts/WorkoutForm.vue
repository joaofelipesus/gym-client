<template>
  <div>
    <div class="modal" :class="display_modal">
      <div @click.prevent="close_modal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Bem vindo !</p>
          <button @click.prevent="close_modal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Notamos que não existe nenhum treino realcionado a sua rotina de treinos atual, para criar um ou mais trinos clique no botão abaixo.</p>
        </section>
        <footer class="modal-card-foot">
          <button @click.prevent="render_form" class="button is-success">Criar novo treino</button>
        </footer>
      </div>
    </div>

    <div id="workout-div">
      <div class="panel is-info">
        <p class="panel-heading">Novo treino</p>
        <div class="panel-block">
          <form @submit.prevent="render_exercises_form">
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
                    <div class="card-content" :class="display_exercise_list[index]">
                      <p>Repetições: {{ workout_exercise.repetitions }}</p>
                      <p>Tempo de descanço: {{ workout_exercise.rest_time }}</p>
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
import store from '../../store/training_routine_store'
import ExerciseService from '../../services/ExerciseService'
export default {
  data(){    
    return {
      display_modal: 'is-hidden',
      display_workout_form: '',
      name: '',
      classes_to_attend: '',
      rest_time: '',
      repetitions: '',
      workout_exercises: [],
      display_exercise_list: [],
      exercises: [],
      exercise_id: ''
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
      if (mutation.type == 'set_training_routine'){
        let training_routine = JSON.parse(store.getters['training_routine'])
        if (training_routine.workouts.length === 0){
          this.display_modal = 'is-active'
        }
      }
    })
  },
  methods: {
    close_modal(){
      this.display_modal = ''
    },
    render_form(){
      this.display_modal = ''
      this.display_workout_form = ''
    },
    add_exercise(){
      let exercise = this.exercises.find(exercise => exercise.id == this.exercise_id)
      let workout_exercise = {
        exercise: exercise,
        rest_time: this.rest_time,
        repetitions: this.repetitions
      }
      this.workout_exercises.push(workout_exercise)
      this.rest_time = ''
      this.repetitions = ''
      this.exercise_id = this.exercises[0].id
      this.display_exercise_list.push('is-hidden')
    },
    expand_workout_exercise_card(index){
      if(this.display_exercise_list[index] == ''){
        this.$set(this.display_exercise_list, index, 'is-hidden');
      }else{
        this.$set(this.display_exercise_list, index, '');
      }
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