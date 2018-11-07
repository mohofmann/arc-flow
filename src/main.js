import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

// Vue Configurations
Vue.config.productionTip = false

// Vue Modules Setup
Vue.use(Bootstrap)

// Create event Bus
export const EventBus = new Vue();

// Vue Instance
new Vue({
  render: h => h(App),
}).$mount('#app')
