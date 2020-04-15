import axios from 'axios'
import store from '../store/user_store'

export default {

  async new(exercise){
    let response = await axios.post('/exercises', { exercise: exercise }, { headers: store.getters['headers'] })
    return response 
  },

  async fetch(){
    let response = await axios.get('/exercises', {headers: store.getters['headers']})
    return response
  }

}