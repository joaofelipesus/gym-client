<template>
  <div>
    <hr>
    <button @click="display_modal" id="btn-complete-training-routine">
      Encerrar rotina de treinos
    </button>

    <div id="btn-complete-training-routine-modal" class="modal" :class='render_modal'>
      <div @click="close_modal" class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p class="modal-card-title">Tem certeza que deseja concluir a rotina de treinos ?</p>
        </section>
        <footer class="modal-card-foot">
          <button @click="complete_training_routine" id="btn-complete" class="is-success" style="margin-left: 10%">
            Finalizar
          </button>
          <button @click="close_modal" id="btn-close-complete-training-routine-button">
            Cancelar
          </button>
        </footer>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import "bulma";

  div{
    width: 100%;
  }

  button{
    @extend .button;
    width: 60%;
    margin-left: 20%;
    margin-right: 20%;
  }

  #btn-complete-training-routine, #btn-close-complete-training-routine-button{
    @extend .is-outlined, .is-danger;
  }

</style>

<script>
import TrainingRoutineService from '../../services/TrainingRoutineService'
import store from '../../store/training_routine_store'
export default {
  data(){
    return {
      render_modal: ''
    }
  },
  methods: {
    close_modal(){
      this.render_modal = ''
    },
    display_modal(){
      this.render_modal = 'is-active'
    },
    complete_training_routine(){
      const training_routine_id = JSON.parse(store.getters['training_routine']).id
      TrainingRoutineService.update({id: training_routine_id, status: "complete"}).then(() => {
        store.dispatch('complete')
        this.render_modal = ''
      }).catch(error => console.log(error))
    }
  }
}
</script>