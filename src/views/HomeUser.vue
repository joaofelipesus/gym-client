<template>
  <div>
    <UserNavbar />
    <TrainingRoutineModal />
  </div>
</template>


<script>
import UserNavbar from '../components/navbars/UserNavbar'
import TrainingRoutineModal from '../components/shared/TrainingRoutineModal'
export default {
  components: {
    UserNavbar,
    TrainingRoutineModal
  }
}
</script>