import axios from 'axios'

const HEADERS = {'Content-Type': 'application/json', 'Accept': 'application/json'}

export default {

  async login(user){
    let response = await axios.post('/users/sign_in', { user: user }, { headers: HEADERS })
    return response 
  }

}