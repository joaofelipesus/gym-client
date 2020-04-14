<template>
  <div>
    <nav id="admin-navbar" class="navbar is-success" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/home/admin" class="navbar-item">
          <font-awesome-icon icon="dumbbell" class="has-text-dark" />
          <span id="brand-name">
            Meu treino
          </span>
          <font-awesome-icon icon="dumbbell" class="has-text-dark" />
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Exercícios
            </a>

            <div class="navbar-dropdown">
              <router-link to="/admin/exercises/new" class="navbar-item">
                Novo
              </router-link>
              <a class="navbar-item">
                Exercícios
              </a>
            </div>
          </div>      

          <a class="navbar-item">
            Documentation
          </a>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a @click.prevent="logout" class="button is-light">
              Sair
            </a>
          </div>
        </div>
      </div>
    </nav>
    <SuccessMessage />
  </div>
</template>

<style lang="scss">
  #brand-name{
    margin-left: 6px;
    margin-right: 6px;
  }
</style>

<script>
import store from '../../store/user_store'
import router from '../../router/index'
import SuccessMessage from '../shared/SuccessMessage';

export default {
  methods: {
    logout(){
      store.dispatch('logout')
      router.push("/")
    }
  },
  components: {
    SuccessMessage
  }
}
</script>