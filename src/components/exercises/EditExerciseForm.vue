<template>
  <div id="edit-exercise-form" class="columns">
    <div class="panel column is-half-desktop is-offset-one-quarter-desktop is-info">
      <p class="has-text-centered panel-heading">
        Editar exercício
      </p>
      <div class="panel-block">
        <form @submit.prevent="send_form">
          <ErrorMessage v-bind:errors="errors"/>
          <div class="field">
            <label class="label">Nome</label>
            <input id="name" class="input" v-model="name" required autofocus/>
          </div>
          <button id="btn-save" class="button is-info is-outlined">
            Salvar
          </button>
        </form>
      </div>
    </div>
    
  </div>
  
</template>

<style lang="scss" scoped>
  #new-exercise-view{
    margin-top: 5%;
  }
</style>

<script>
import ErrorMessage from '../shared/ErrorMessage'
import ExerciseService from '../../services/ExerciseService'
import store from '../../store/notifications_store'
import router from '../../router/index'
export default {
  data(){
    return {
      id: this.$route.params.id,
      name: '',
      errors: ''
    }
  },
  created(){
    ExerciseService.show(this.$route.params.id).then(response => {
      this.name = response.data.exercise.name
    }).catch(error => this.errors = error.response.data.errors)
  },
  methods: {
    send_form(){
      ExerciseService.update({id: this.id, name: this.name}).then(() => {
        store.dispatch('add_message', 'Exercício editado com sucesso.')
        router.push('/home/admin')
      }).catch(error => {
        this.errors = error.response.data.errors[0]
      })
    }
  },
  components: {
    ErrorMessage
  }
}
</script>