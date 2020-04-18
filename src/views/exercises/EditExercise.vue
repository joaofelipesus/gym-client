<template>
  <div>
    <AdminNavbar />
    
    <EditExerciseForm />

  </div>
</template>



<script>
import AdminNavbar from '../../components/admin/AdminNavbar'
import EditExerciseForm from '../../components/exercises/EditExerciseForm'
export default {
  name: 'NewExercise',
  components: {
    AdminNavbar,
    EditExerciseForm
  }
}
</script>