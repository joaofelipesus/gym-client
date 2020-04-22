<template>
  <div>
    <UserNavbar />
    <TrainingRoutineModal />
    <WithoutWorkoutsModal />
    <WorkoutForm />
  </div>
</template>


<script>
import UserNavbar from '../components/navbars/UserNavbar'
import TrainingRoutineModal from '../components/training_routine/TrainingRoutineModal'
import WorkoutForm from '../components/workouts/WorkoutForm'
import WithoutWorkoutsModal from '../components/workouts/WithoutWorkoutsModal'
export default {
  components: {
    UserNavbar,
    TrainingRoutineModal,
    WorkoutForm,
    WithoutWorkoutsModal
  }
}
</script>