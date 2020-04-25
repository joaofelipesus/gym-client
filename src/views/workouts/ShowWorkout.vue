<template>
  <div>
    <UserNavbar />

    <ul>
      
      <li>Pegar workout do servidor</li>
      <li>Exibir dados</li>
      <li>Iniciar treino</li>
    </ul>

  </div>
</template>

<script>
import UserNavbar from '../../components/navbars/UserNavbar'
export default {
  components: {
    UserNavbar,
  }
}
</script>