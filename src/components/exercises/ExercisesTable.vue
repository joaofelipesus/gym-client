<template>
  <div id="exercises-list" class="columns">
    <div class="column is-half is-offset-one-quarter">
      <table>
        <thead>
          <th>Nome</th>
          <th>Status</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="exercise in exercises" v-bind:key="exercise.id" class="exercise">
            <td> {{ exercise.name }} </td>
            <td v-html="status(exercise)"></td>
            <td>
              <a v-if="exercise.status == 'active'" class="disable" @click.prevent="disable(exercise.id)">Desabilitar</a>
              <a v-if="exercise.status == 'inactive'" class="enable" @click.prevent="enable(exercise.id)">Habilitar</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <button v-for="index in page_indexes" v-bind:key="index" @click.prevent="change_page(index)" :class="{ 'is-active' : current_page == index}" class="index-button">
              {{ index }}
            </button>
          </tr>
        </tfoot>
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
  button{
    @extend .button, .is-dark, .is-small, .is-outlined;
    margin-top: 2%;
    margin-left: 2%;
  }
  .disable{
    @extend .button, .is-danger, .is-outlined, .is-small; 
  }
  .enable{
    @extend .button, .is-info, .is-outlined, .is-small;
  }
</style>

<script>
import ExercisesService from "../../services/ExerciseService"
export default {
  data(){
    return {
      exercises: [],
      page_indexes: [],
      current_page: 1
    }
  },
  created(){
    ExercisesService.fetch(1).then(response => {
      this.exercises = response.data.exercises
      this.page_indexes = [...Array(response.data.total_pages).keys()].map((index) => index + 1)      
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    status(exercise){
      if (exercise.status == "active")
        return "<span class='has-text-success'>Ativo</span>"
      else
        return "<span class='has-text-danger'>Inativo</span>"
    },
    change_page(new_page){
      this.current_page = new_page
      ExercisesService.fetch(new_page).then(response => { 
        this.exercises = response.data.exercises
      }).catch(error => {
        console.log(error);
      })
    },
    disable(exercise_id){      
      ExercisesService.update({id: exercise_id, status: "inactive"}).then(() => {
        ExercisesService.fetch(this.current_page).then(response => {
          this.exercises = response.data.exercises
        })
      }).catch(error => {
        console.log(error);
      })
    },
    enable(exercise_id){      
      ExercisesService.update({id: exercise_id, status: 'active'}).then(() => {
        ExercisesService.fetch(this.current_page).then(response => {
          this.exercises = response.data.exercises
        })
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>