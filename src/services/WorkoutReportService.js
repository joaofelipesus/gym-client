import axios from 'axios'
import store from '../store/user_store'

export default {

  async progress(){
    let response = await axios.get(`/workout_reports/progress`, { headers: store.getters['headers'] })
    return response
  },

  async create(workout_id){
    let response = await axios.post('/workout_reports', { workout_report: { workout_id: workout_id }}, { headers: store.getters['headers'] })
    return response
  },

  async update(workout_report){
    let response = await axios.patch(`/workout_reports/${workout_report.id}`, {workout_report: workout_report}, { headers: store.getters['headers']})
    return response
  }

}
