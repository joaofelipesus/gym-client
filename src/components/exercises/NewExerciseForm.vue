<template>
  <div id="new-exercise-view" class="columns">
    <div class="panel column is-half-desktop is-offset-one-quarter-desktop is-info">
      <p class="has-text-centered panel-heading">
        Novo exercício
      </p>
      <div class="panel-block">
        <form @submit.prevent="send_form">
          <ErrorMessage v-bind:errors="errors"/>
          <div class="field">
            <label class="label">Nome</label>
            <input class="input" v-model="name" required autofocus/>
          </div>
          <button class="button is-info">
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
      name: '',
      errors: ''
    }
  },
  methods: {
    send_form(){
      ExerciseService.new({name: this.name}).then(() => {
        store.dispatch('add_message', 'Exercício criado com sucesso.')
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