<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <table class="table is-fullwidth">
        <thead class="has-background-dark">
          <th class="has-text-centered has-text-white">Nome</th>
          <th class="has-text-centered has-text-white">Status</th>
        </thead>
        <tbody>
          <tr v-for="exercise in exercises" v-bind:key="exercise.id">
            <td class="has-text-centered"> {{ exercise.name }} </td>
            <td class="has-text-centered"> {{ exercise.status }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  table{
    margin-top: 2.5%;
  }
</style>

<script>
import ExercisesService from "../../services/ExerciseService"
export default {
  data(){
    return {
      exercises: []
    }
  },
  created(){
    ExercisesService.fetch().then(response => {
      this.exercises = response.data.exercises
    }).catch(error => {
      console.log(error);
    })
  },
}
</script>