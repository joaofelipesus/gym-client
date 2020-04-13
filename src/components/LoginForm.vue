<template>
  
  <div class="columns">
    <div id="login-form" class="column panel is-info is-fullwidth-mobile is-half-desktop is-offset-one-quarter-desktop is-paddingless-desktop">
      <p class="has-text-centered panel-heading">Bem vindo</p>
      <div class="panel-block">
        <form @submit.prevent="send_login">
          <div v-show="has_error">
            {{ has_error }}
            {{ error }}
            <p id="error-message" class="has-text-danger has-text-centered">
              {{ error }}
            </p>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <input v-model="email" id="email" class="input" type="email" required autofocus>
          </div>
          <div class="field">
            <label class="label">Senha</label>
            <input v-model="password" id="password" class="input" type="password" requried>
          </div>
          <button class="button is-medium-mobile is-fullwidth-mobile is-success">
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
import UserService from '../services/UserServices'
export default {
  data(){
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    send_login(){
      let user = { email: this.email, password: this.password }
      UserService.login(user).then(response => {
        console.log(response);
        alert('MALAKOI !')
      }).catch(error => {        
        this.error = error.response.data.error
      })
    }
  },
  computed: {
    has_error(){
      if (this.error.length > 0) return true
      return false
    }
  }
}
</script>