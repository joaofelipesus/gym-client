<template>
  
  <div class="columns">
    <div id="login-form" class="column panel is-info is-fullwidth-mobile is-half-desktop is-offset-one-quarter-desktop is-paddingless-desktop">
      <p class="has-text-centered panel-heading">Bem vindo</p>
      <div class="panel-block">
        <form @submit.prevent="send_login">
          <ErrorMessage v-bind:errors="errors" />
          <div class="field">
            <label class="label">Email</label>
            <input v-model="email" id="email" class="input" type="email" required autofocus>
          </div>
          <div class="field">
            <label class="label">Senha</label>
            <input v-model="password" id="password" class="input" type="password" requried>
          </div>
          <button id="btn-login" class="button is-medium-mobile is-fullwidth-mobile is-success">
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
  

</template>

<style lang="scss">

  #login-form{
    margin-top: 5%;
  }

  form{
    width: 100%;
  }
  
</style>

<script>
import ErrorMessage from './shared/ErrorMessage'
import UserService from '../services/UserServices'
import store from '../store/user_store'
import router from '../router/index'
export default {
  data(){
    return {
      email: '',
      password: '',
      errors: ''
    }
  },
  methods: {
    send_login(){
      let user = { email: this.email, password: this.password }
      UserService.login(user).then(response => {
        store.dispatch("authenticate", response.data)
        if(response.data.kind == 'user')
          router.push('/home/user')
        else if(response.data.kind == 'admin')
          router.push('/home/admin')
      }).catch(error => {
        this.errors = error.response.data.error
      })
    },
  },
  components: {
    ErrorMessage
  }
  
}
</script>