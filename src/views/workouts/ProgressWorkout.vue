<template>
  <div id="workout-progress-view">
    <UserNavbar /> 
    <h3 class="has-text-centered is-size-4" style="margin-top: 3%">
      Treino {{ workout_report.workout.name }}
    </h3>

    <hr>

    <div v-for="exercise_report in workout_report.exercise_reports" :key="exercise_report.id" class="card">
      <header class="card-header has-background-primary">
        <p class="card-header-title has-text-white">{{ exercise_report.workout_exercise.exercise.name }}</p>
      </header>
      <div class="card-content">
        <p>Séries: {{ exercise_report.workout_exercise.series_number }}</p>
        <p>Repetições: {{ exercise_report.workout_exercise.repetitions }}</p>
        <p>Tempo de descanço: {{exercise_report.workout_exercise.rest_time }}</p>
        <button @click.prevent="redirect_to_new_exercise_report(exercise_report.id)" class="button is-info  is-fullwidth is-outlined" style="margin-top: 5%;">
          Iniciar
        </button>
      </div>
          
    </div>

  </div>
</template>

<script>
import UserNavbar from '@/components/navbars/UserNavbar'
import WorkoutReportService from '../../services/WorkoutReportService'
import router from '@/router/index'
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
      this.workout_report = response.data.workout_report
    }).catch(error => console.log(error))
  },
  methods: {
    redirect_to_new_exercise_report(exercise_report_id){
      router.push(`/user/exercise_report/${exercise_report_id}`)
    }
  }
}
</script>