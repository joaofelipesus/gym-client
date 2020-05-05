<template>
  <div id="complete-training-routine-modal" class="modal" :class="render">
    <div @click.prevent="close_modal" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Olá !</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>
          Notamos que todos os treinos desta rotina foram conclúidos, deseja concluir esta rotina e cadastrar uma nova rotina de treinos ?
        </p>
      </section>
      <footer class="modal-card-foot">
        <button @click.prevent="complete_training_routine" id="complete-training-routine" class="button is-success">
          Concluir rotina de treino
        </button>
        <button @click.prevent="close_modal" id="close-complete-training-modal" class="button is-danger is-outlined">
          Fechar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import TrainingRoutineService from '@/services/TrainingRoutineService'
import store from '@/store/training_routine_store'
export default {
  data(){
    return {
      render: ''
    }
  },
  created(){
    TrainingRoutineService.can_complete().then(response => {
      if (response.data.can_be_complete)
        this.render = 'is-active'
      else
        this.render = ''
    }).catch(error => console.log(error))
  },
  methods: {
    close_modal(){
      this.render = ''
    },
    complete_training_routine(){
      const training_routine_id = JSON.parse(store.getters['training_routine']).id
      const training_routine = { id: training_routine_id, status: "complete" }
      TrainingRoutineService.update(training_routine).then(() => {
        store.dispatch('complete')
        this.render = ''
      }).catch(error => console.log(error))
    }
  }
}
</script>