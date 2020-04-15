<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <table>
        <thead>
          <th>Nome</th>
          <th>Status</th>
        </thead>
        <tbody>
          <tr v-for="exercise in exercises" v-bind:key="exercise.id">
            <td> {{ exercise.name }} </td>
            <td v-html="status(exercise)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'bulma';
  table{
    margin-top: 2.5%;
    @extend .table, .is-fullwidth;
  }
  thead{
    @extend .has-background-dark;
  }
  th{
    @extend .has-text-white;
  }
  td, th {
    @extend .has-text-centered;
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
  methods: {
    status(exercise){
      if (exercise.status == "active")
        return "<span class='has-text-success'>Ativo</span>"
      else
        return "<span class='has-text-danger>Inativo</span>"
    }
  }
}
</script>