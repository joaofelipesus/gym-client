import store from '../store/user_store'
import axios from 'axios'

export default {

  async progress(){
    return await axios.get(`/training_routines/progress`, { headers: store.getters['headers'] })
  },
  async create(){
    const user_id = store.getters['user'].id
    return await axios.post('/training_routines', { training_routine: { user_id: user_id } }, { headers: store.getters['headers'] })  
  },
  async can_complete(){
    return await axios.get('/training_routines/can_be_complete', { headers: store.getters['headers'] })
  },
  async update(training_routine){
    return await axios.patch(`/training_routines/${training_routine.id}`, { training_routine: training_routine }, { headers: store.getters['headers'] })
  }

}