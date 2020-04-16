import axios from 'axios'
import store from '../store/user_store'

export default {

  async new(exercise){
    let response = await axios.post('/exercises', { exercise: exercise }, { headers: store.getters['headers'] })
    return response 
  },

  async fetch(page){
    let response = await axios.get(`/exercises?page=${page}`, {headers: store.getters['headers']})
    return response
  },

  async update(exercise){
    let response = await axios.patch(`/exercises/${exercise.id}`, { exercise: exercise }, {headers: store.getters['headers']})
    return response
  }

}