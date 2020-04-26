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
import WorkoutReportService from '../services/WorkoutReportService'
import router from '@/router/index'

export default {
  components: {
    UserNavbar,
    TrainingRoutineModal,
    WorkoutForm,
    WithoutWorkoutsModal,
    NewWorkoutModal,
    WorkoutList
  },
  created(){
    WorkoutReportService.progress().then(response => {
      router.push(`/user/workout_report/${response.data.workout_report.id}/progress`)
    }).catch(error => {
      if (error.response.status !== 404)
        console.log(error);
    })
  }

}
</script>