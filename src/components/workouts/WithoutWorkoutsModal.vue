<template>
  <div id="without-workout-modal" class="modal" :class="display_modal">
    <div @click.prevent="close_modal" id="without-workout-modal-background" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Bem vindo !</p>
        <button @click.prevent="close_modal" id="close-without-workout-modal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>Notamos que não existe nenhum treino realcionado a sua rotina de treinos atual, para criar um ou mais trinos clique no botão abaixo.</p>
      </section>
      <footer class="modal-card-foot">
        <button @click.prevent="render_form" id="new-workout-button" class="button is-success">
          Criar novo treino
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import store from '../../store/training_routine_store'
//import workout_store from '../../store/workout_store'
import router from '../../router/index'
export default {
  data(){
    return {
      display_modal: 'is-hidden',
    }
  },
  created(){    
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
      //workout_store.dispatch('display_workout_form')
      //this.display_modal = ''
      router.push('/user/workouts/new')
    },
  }
}
</script>