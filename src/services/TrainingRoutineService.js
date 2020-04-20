import store from '../store/user_store'
import axios from 'axios'

export default {

  async progress(){
    let response = await axios.get(`/training_routines/${store.getters['user'].id}/progress`, { headers: store.getters['headers'] })
    return response
  },
   async create(){
    const user_id = store.getters['user'].id
    let response = await axios.post('/training_routines', { training_routine: { user_id: user_id } }, { headers: store.getters['headers'] })
    return response  
  }

}