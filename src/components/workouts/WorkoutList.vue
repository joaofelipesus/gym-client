<template>
  <div :class="render">
    
    <div>
      <div v-for="workout in workouts" :key="workout.id" class="card">
        <header class="card-header">
          <h4 class="card-header-title has-text-weight-bold">
            Treino {{ workout.name }}
          </h4>
        </header>
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
  }
}
</script>