import axios from 'axios'
import store from '../store/user_store'

export default {

  async create(workout){
    let response = await axios.post('/workouts', { workout: workout }, { headers: store.getters['headers'] })
    return response
  },

  async show(workout_id){
    let response = await axios.get(`/workouts/${workout_id}`, { headers: store.getters['headers'] })
    return response
  }

}
