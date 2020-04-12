<template>
  
  <div class="columns">
    <div id="login-form" class="column panel is-info is-fullwidth-mobile is-half-desktop is-offset-one-quarter-desktop is-paddingless-desktop">
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