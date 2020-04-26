<template>
  <div>
    <UserNavbar />
    <ShowWorkout />
  </div>
</template>

<script>
import UserNavbar from '../../components/navbars/UserNavbar'
import ShowWorkout from '../../components/workouts/ShowWorkout'
export default {
  components: {
    UserNavbar,
    ShowWorkout,
  },
}
</script>