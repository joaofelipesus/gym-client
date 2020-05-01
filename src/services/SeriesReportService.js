import axios from 'axios'
import store from '../store/user_store'

export default {

  async create(series_reports){
    let response = await axios.post(`/series_reports`, { series_reports: series_reports} , { headers: store.getters['headers'] })
    return response
  }

}
