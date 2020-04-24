<template>
  <div id="new-workout-modal" class="modal" :class="display_modal">
    <div @click.prevent="close_modal" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Olá !</p>
        <button @click.prevent="close_modal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>Treino cadastrado com sucesso, deseja cadastrar um novo treino ?</p>
      </section>
      <footer class="modal-card-foot">
        <button id="btn-new-workout" @click.prevent="render_form" class="button is-success">
          Criar novo treino
        </button>
        <button @click.prevent="close_modal" class="button is-primary">
          Concluir
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import store from '../../store/workout_store'
export default {
  data(){
    return {
      display_modal: 'is-hidden',
    }
  },
  created(){    
    store.subscribe((mutation) => {
      if (mutation.type == 'set_workout'){
        this.display_modal = store.getters['display_new_workout_modal']
      }
    })
  },
  methods: {
    close_modal(){
      this.display_modal = ''
    },
    render_form(){
      store.dispatch('display_workout_form')
      this.display_modal = ''
    },
  }
}
</script>