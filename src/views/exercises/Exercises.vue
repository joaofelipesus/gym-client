<template>
  <div id="exercises-view">
    <AdminNavbar />
    <ExercisesTable />
  </div> 
</template>

<script>
import AdminNavbar from "@/components/admin/AdminNavbar"
import ExercisesTable from "@/components/exercises/ExercisesTable"
export default {
  name: 'Exercises',
  components: {
    AdminNavbar,
    ExercisesTable
  }
}
</script>