<template>
  <div id="workout-progress-view">
    <UserNavbar /> 
    <h3 class="has-text-centered is-size-4" style="margin-top: 3%">
      Treino {{ workout_report.workout.name }}
    </h3>

    <hr>

    <div v-for="workout_exercise in workout_report.workout.workout_exercises" :key="workout_exercise.id" class="card">
      <header class="card-header has-background-primary">
        <p class="card-header-title has-text-white">{{ workout_exercise.exercise.name }}</p>
      </header>
      <div class="card-content">
        <p>Séries: {{ workout_exercise.series_number }}</p>
        <p>Repetições: {{ workout_exercise.repetitions }}</p>
        <p>Tempo de descanço: {{workout_exercise.rest_time }}</p>
        <button class="button is-info  is-fullwidth is-outlined" style="margin-top: 5%;">
          Iniciar
        </button>
      </div>
          
    </div>

  </div>
</template>

<script>
import UserNavbar from '@/components/navbars/UserNavbar'
import WorkoutReportService from '../../services/WorkoutReportService'
export default {
  data(){
    return {
      workout_report: {
        workout: {
          name: ''
        }
      }
    }
  },
  components: {
    UserNavbar,
  },
  created(){
    WorkoutReportService.progress().then(response => {
      console.log(response.data.workout_report.workout);
      this.workout_report = response.data.workout_report
    }).catch(error => console.log(error))
  }
}
</script>