import axios from 'axios'
import store from '../store/user_store'

export default {

  async new(exercise){
    console.log(store.getters['headers']);
    
    let response = await axios.post('/exercises', { exercise: exercise }, { headers: store.getters['headers'] })
    return response 
  }

}