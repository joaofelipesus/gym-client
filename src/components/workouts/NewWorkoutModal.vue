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
import router from '../../router'
import workout_exercise_store from '../../store/workout_exercise_store'
export default {
  data(){
    return {
      display_modal: 'is-hidden',
    }
  },
  created(){    
    store.subscribe((mutation) => {
      if (mutation.type == 'display_modal'){
        this.display_modal = 'is-active'
      }
    })
  },
  methods: {
    close_modal(){
      router.push('/home/user')
    },
    render_form(){
      workout_exercise_store.dispatch('clean')
      this.display_modal = ''
    },
  }
}
</script>