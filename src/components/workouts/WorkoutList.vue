<template>
  <div :class="render">
    
    <div>
      <div v-for="workout in workouts" :key="workout.id" @click.prevent="redirect_to_workout(workout.id)" class="card workout-card">
        <header class="card-header">
          <h4 class="card-header-title has-text-weight-bold">
            Treino {{ workout.name }}
          </h4>
        </header>
        <div class="card-content">
          Realizados {{ workout.workout_reports.length }} / {{ workout.classes_to_attend }}
          <progress class="progress is-medium is-info" :value="workout.workout_reports.length" :max="workout.classes_to_attend">
          </progress>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'bulma';

.card{
  margin-top: 10%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

</style>

<script>
import store from '../../store/training_routine_store'
import router from '../../router/index'
export default {
  data(){
    return {
      render: 'is-hidden',
      workouts: []
    }
  },
  created(){
    let current_training_routine = JSON.parse(store.getters['training_routine'])
    if (current_training_routine){
      if(current_training_routine.workouts.length > 0){
        this.render = ''
        this.workouts = current_training_routine.workouts
      }else{
        this.render = 'is-hidden'
      }
    }
      
    store.subscribe((mutation) => {
      if (mutation.type == 'set_training_routine'){
        let training_routine = JSON.parse(store.getters['training_routine'])
        if (training_routine.workouts.length > 0){
          this.render = ''
          this.workouts = training_routine.workouts
        }else{
          this.render = 'is-hidden'
        }
      }
    })
  },
  methods: {
    redirect_to_workout(workout_id){
      router.push(`/user/workouts/${workout_id}`)
    }
  }
}
</script>