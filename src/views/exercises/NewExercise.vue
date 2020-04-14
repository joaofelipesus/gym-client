<template>
  <div>
    <AdminNavbar />
    
    <NewExerciseForm />

  </div>
</template>



<script>
import AdminNavbar from '../../components/admin/AdminNavbar'
import NewExerciseForm from '../../components/exercises/NewExerciseForm'
export default {
  name: 'NewExercise',
  components: {
    AdminNavbar,
    NewExerciseForm
  }
}
</script>