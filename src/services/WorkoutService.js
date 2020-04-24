import axios from 'axios'
import store from '../store/user_store'

export default {

  create(workout){
    let response = axios.post('/workouts', { workout: workout }, { headers: store.getters['headers'] })
    return response
  },

}
