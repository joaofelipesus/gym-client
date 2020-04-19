import store from '../store/user_store'
import axios from 'axios'

export default {

  async progress(){
    let response = await axios.get(`/training_routines/${store.getters['user'].id}/progress`, { headers: store.getters['headers'] })
    return response
  }

}