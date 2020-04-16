<template>
  <div>
    <div v-show="has_error_message" class="notification is-danger">
      <button class="delete" @click.prevent="hide_error_notification"></button>
      {{ error_message }}
    </div>
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
      current_page: 1,
      error_message: '',
      has_error: false
    }
  },
  created(){
    ExercisesService.fetch(1).then(response => {
      this.exercises = response.data.exercises
      this.page_indexes = [...Array(response.data.total_pages).keys()].map((index) => index + 1)      
    }).catch(error => {
      this._display_error_notification(error)
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
      this._reload_exercises()
    },
    disable(exercise_id){      
      ExercisesService.update({id: exercise_id, status: "inactive"}).then(() => {
        this._reload_exercises()
      }).catch(error => {
        this._display_error_notification(error)
      })
    },
    enable(exercise_id){      
      ExercisesService.update({id: exercise_id, status: 'active'}).then(() => {
        this._reload_exercises()
      }).catch(error => {
        this._display_error_notification(error)
      })
    },
    _reload_exercises(){
       ExercisesService.fetch(this.current_page).then(response => { 
        this.exercises = response.data.exercises
      }).catch(error => {
        this._display_error_notification(error)
      })
    },
    hide_error_notification(){
      this.error_message = ""
      this.has_error = false
    },
    _display_error_notification(error){
      this.has_error = true
      this.error_message = error.response.data.error
    }
  },
  computed: {
    has_error_message(){
      if(this.has_error)
        return true
      else
        return false
    }
  }
}
</script>