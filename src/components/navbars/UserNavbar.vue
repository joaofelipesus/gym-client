<template>
  <div id="user-navbar">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a @click="toggle_navbar" :class="navbar_status" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="navbar_status">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <!--<div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>-->
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
    }
  },

}
</script>