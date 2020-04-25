<template>
  <div>
    <UserNavbar />
    <TrainingRoutineModal />
    <WithoutWorkoutsModal />
    <WorkoutForm />
    <NewWorkoutModal />
    <WorkoutList />
  </div>
</template>


<script>
import UserNavbar from '../components/navbars/UserNavbar'
import TrainingRoutineModal from '../components/training_routine/TrainingRoutineModal'
import WorkoutForm from '../components/workouts/WorkoutForm'
import WithoutWorkoutsModal from '../components/workouts/WithoutWorkoutsModal'
import NewWorkoutModal from '../components/workouts/NewWorkoutModal'
import WorkoutList from '../components/workouts/WorkoutList'
export default {
  components: {
    UserNavbar,
    TrainingRoutineModal,
    WorkoutForm,
    WithoutWorkoutsModal,
    NewWorkoutModal,
    WorkoutList
  }
}
</script>