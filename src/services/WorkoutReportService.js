import axios from 'axios'
import store from '../store/user_store'

export default {

  async progress(){
    const user = store.getters['user']
    let response = await axios.get(`/workout_reports/${user.id}/progress`, { headers: store.getters['headers'] })
    return response
  },

  async create(workout_id){
    let response = axios.post('/workout_reports', { workout_report: { workout_id: workout_id }}, { headers: store.getters['headers'] })
    return response
  },

}
