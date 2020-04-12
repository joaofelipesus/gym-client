<template>
  <div class="home">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Home',
  components: {
    LoginForm
  }
}
</script>
