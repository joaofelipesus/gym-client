import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Bulma from 'bulma'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

console.log(process.env.NODE_ENV)
//axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = 'https://treinohype-api.herokuapp.com/';

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Bulma)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
