import axios from 'axios'
import store from '../store/user_store'

export default {

  async get(exercise_report_id){
    let response = await axios.get(`/exercise_reports/${exercise_report_id}`, { headers: store.getters['headers'] })
    return response
  }

}
