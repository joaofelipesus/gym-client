<template>
  <div v-show="has_error">
    <p id="error-message" class="has-text-danger has-text-centered">
      {{ errors }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    errors: String 
  },
  computed: {
    has_error(){
      if (this.$props.errors.length > 0) return true
      return false
    }
  }
}
</script>
