<template>
  <div>

    <h1>
      Treino {{ workout.name }}
    </h1>

    <h3 class="has-text-dark">
      {{ workout.workout_reports.length }} de {{ workout.classes_to_attend }} treinos concluídos
    </h3>

    <hr>

    <button class="is-primary">
      Iniciar Treino
    </button>

    <table>
      <thead class="has-background-dark">
        <th class="has-text-white">Exercícios</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="workout_exercise in workout.workout_exercises" :key="workout_exercise.id">
          <td>
            {{ workout_exercise.exercise.name }}
          </td>
          <td>progresso</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style lang="scss" scoped>
  @import 'bulma';

  h1{
    @extend .is-size-3;
  }

  h3{
    @extend .is-size-4;
  }

  table{
    @extend .table, .is-fullwidth;
  }

  th, td, h1, h3{
    @extend .has-text-centered;
  }

  button{
    @extend .button;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
  }

  h1, h3, table{
    margin-top: 5%
  }

</style>

<script>
import WorkoutService from '@/services/WorkoutService'
export default {
  data(){
    return {
      workout: {
        clases_to_attend: 1,
        workout_reports: []
      }
    }
  },
  created(){
    
    WorkoutService.show(this.$route.params.id).then(response => {
      console.log(response);
      this.workout = response.data.workout
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>