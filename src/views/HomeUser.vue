<template>
  <div>
    <UserNavbar />
    <TrainingRoutineModal />
    <WorkoutForm />
  </div>
</template>


<script>
import UserNavbar from '../components/navbars/UserNavbar'
import TrainingRoutineModal from '../components/training_routine/TrainingRoutineModal'
import WorkoutForm from '../components/workouts/WorkoutForm'
export default {
  components: {
    UserNavbar,
    TrainingRoutineModal,
    WorkoutForm,
  }
}
</script>