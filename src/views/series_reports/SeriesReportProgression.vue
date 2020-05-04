<template>
  <div>
    <UserNavbar />
    <h1> {{ exercise }} </h1>
    <hr>

    <div>
      <apexchart width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
    
    <table>
      <thead class="has-background-dark">
        <th>Data</th>
        <th>Peso</th>
      </thead>
      <tr v-for="(workou_report, index) in workout_reports" :key="index">
        <td> {{ workou_report.date }} </td>
        <td> {{ workou_report.mean_weight }} </td>
      </tr>
    </table>

  </div>
</template>

<style lang="scss" scoped>
  @import "bulma";
  h1{
    @extend .has-text-centered, .is-size-3;
    margin-top: 5%;
    margin-bottom: 5%;
  }

  td, th{
    @extend .has-text-centered;
  }

  th{
    @extend .has-text-white;
  }

  table{
    @extend .table, .is-fullwidth;
    margin-top: 5%;
  }
</style>

<script>
import UserNavbar from '@/components/navbars/UserNavbar'
import SeriesReportService from '@/services/SeriesReportService'
export default {
  data: function() {
    return {
      exercise: '',
      workout_reports: [],
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  mounted(){
    const exercise_id = this.$route.params.exercise_id
    SeriesReportService.progression(exercise_id).then(response => {
      this._update_chart(response.data.weights_used)
      this.exercise = response.data.exercise.name
      this.workout_reports = response.data.weights_used
    }).catch(error => console.log(error))
  },
  components: {
    UserNavbar,
  },
  methods: {
    _update_chart(weights_used){
      let weights = []
      let dates = []
      weights_used.forEach(series => {
        weights.push(series.mean_weight)
        dates.push(series.date)
      })
      this.series = [{data: weights}]
      this.chartOptions = { 
        xaxis: { categories: dates },
        zoom: { enabled: false },
      }
    }
  }
}
</script>