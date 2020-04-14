<template>
  <div v-if="has_message" class="notification is-info is-light">
    <button @click="remove_message" class="delete"></button>
    <p id="success-message" class="">
      {{ message }}
    </p>
  </div>
</template>

<script>
import store from '../../store/notifications_store'
export default {
  data(){
    return {
      message: store.getters['message'],
      has_message: store.getters['has_message']
    }
  },
  methods: {
    remove_message(){
      store.dispatch('remove_message')
      this.has_message = false
      this.message = ''
    }
  }

}
</script>
