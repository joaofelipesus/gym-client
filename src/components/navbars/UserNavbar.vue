<template>
  <div id="user-navbar">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a @click.prevent="redirect_to_home" class="navbar-item">
          Meu Treino
          <font-awesome-icon icon="dumbbell" class="has-text-white" style="margin-left: 8px;" />
        </a>

        <a @click="toggle_navbar" :class="navbar_status" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="navbar_status">

        <div class="navbar-end">
          <div class="navbar-item">
            <button @click.prevent="logout" class="button is-info">
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import store from '../../store/user_store'
import router from '../../router/index'
export default {
  data(){
    return {
      navbar_status: ''
    }
  },
  methods: {
    toggle_navbar(){
      if(this.navbar_status == '')
        this.navbar_status = 'is-active'
      else
        this.navbar_status = ''
    },
    logout(){
      store.dispatch('logout')
      router.push('/')
    },
    redirect_to_home(){
      router.push('/home/user')
    }
  },

}
</script>