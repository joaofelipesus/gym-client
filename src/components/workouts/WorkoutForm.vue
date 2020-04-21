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
                <header class="card-header">
                  <p class="card-header-title">Adicionar exercícios</p>
                </header>
                <div class="card-content">
                  <div class="field">
                    <label class="label">Exercício</label>
                    <select v-model="exercise_id" class="select">
                      <option v-for="exercise in exercises" :key="exercise.id" value="exercise.id">
                        {{ exercise.name }}
                      </option>
                    </select>
                  </div>
                  <div class="field">
                    <label class="label">Repetições</label>
                    <input class="input" type="number" required/>
                  </div>
                  <div class="field">
                    <label class="label">Tempo de descanço</label>
                    <input class="input" type="number" placeholder="Tempo em segundos" required/>
                  </div>
                  <button class="button is-primary">
                    Adicionar
                  </button>
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
    margin-top: 8%;
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
  }
}
</script>