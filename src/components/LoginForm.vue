<template>
  
  <div id="login-form" class="panel is-info">
    <p class="has-text-centered panel-heading">Bem vindo</p>
    <div class="panel-block">
      <form>
        <div class="field">
          <label class="label">Email</label>
          <input class="input" type="email">
        </div>
        <div class="field">
          <label class="label">Senha</label>
          <input class="input" type="password">
        </div>
        <button class="button is-medium is-fullwidth is-success">
          Entrar
        </button>
      </form>
    </div>
  </div>

</template>

<style lang="scss">
  
  #login-form{
    width: 95%;
    margin-left: 2.5%;
    margin-top: 15%;
    padding-bottom: 1%;
  }

  form{
    width: 100%;
  }
</style>