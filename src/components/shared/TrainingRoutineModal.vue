<template>
  <div class="modal" :class="new_training_routine_modal">
    <div @click="close_new_training_routine_modal" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Bem vindo !</p>
        <button @click="close_new_training_routine_modal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Notamos que não existe nenhuma rotina de treinamento em andamento, deseja criar uma agora ?
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Criar nova rotina</button>
      </footer>
    </div>
  </div>
</template>

<script>
import TrainingRoutineService from '../../services/TrainingRoutineService'
export default {
  data(){
    return {
      new_training_routine_modal: ''
    }
  },
  created(){
    TrainingRoutineService.progress().then(response => {
      console.log(response)
    }).catch(error => {
      if(error.response.status == 404){
        this.new_training_routine_modal = 'is-active'
      }
    })
  },
  methods: {
    close_new_training_routine_modal(){
      this.new_training_routine_modal = ''
    }
  }
}
</script>