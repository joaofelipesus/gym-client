<template>
  <div>
    <UserNavbar />

    <div class="panel is-primary">
      <div class="panel-heading">
        <h2 class="card-header-title has-text-white is-size-5">
          {{ exercise_report.workout_exercise.exercise.name }}
        </h2>
      </div>
      <div class="panle-block" style="padding-top: 5%;">
        <p> Séries: {{ exercise_report.workout_exercise.series_number }} </p>
        <p> Repetições: {{ exercise_report.workout_exercise.repetitions }} </p>
        <p> Tempo de descanço: {{ exercise_report.workout_exercise.rest_time }} </p>
        <hr>
      </div>
      <div class="panel-block">
        <form @submit.prevent="create_series_reports">
          <div v-for="series in series_reports" :key="series.id" class="field">
            <label class="label">Série {{ series.sequence_index}} </label>
            <input v-model="series_reports[series.sequence_index - 1].weight_used" class="input" type="number" step="0.1" placeholder="Peso utilizado" :id="'series-' + series.sequence_index" />
          </div>
          <button id="btn-save" class="button is-primary">
            Salvar
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import "bulma";
  p{
    margin-left: 5%;
    @extend .is-size-4
  }
  .panel{
    margin-top: 5%;
  }

</style>

<script>
import ExerciseReportService from '../../services/ExerciseReportService'
import UserNavbar from '../../components/navbars/UserNavbar'
import SeriesReportService from '../../services/SeriesReportService'
import router from '../../router/index'
export default {
  data(){
    return {
      exercise_report: {
        workout_exercise: {
          exercise: {
            name: ''
          }
        }
      },
      series_reports: [],
    }
  },
  components: {
    UserNavbar,
  },
  created(){
    let exercise_report_id = this.$route.params.id
    ExerciseReportService.get(exercise_report_id).then(response => {      
      let series_number = response.data.exercise_report.workout_exercise.series_number
      for (let index = 1; index <=  series_number;index++){
        let last_weight_used = 0
        if (response.data.last_series.length > 0)
          last_weight_used = response.data.last_series[index - 1].weight_used
        this.series_reports.push({
          sequence_index: index,
          weight_used: last_weight_used,
          exercise_report_id: this.$route.params.id
        })
      }
      this.exercise_report = response.data.exercise_report
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    create_series_reports(){
      SeriesReportService.create(this.series_reports).then(() => {
        router.push(`/home/user`)
      }).catch(error => {
        console.log(error.response.data);
      })

    }
  }
}
</script>