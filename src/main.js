import Vue from 'vue'
import {
	MdButton,
	MdField, 
	MdFile,
	MdSnackbar,
	MdToolbar,
	MdDrawer,
	MdDivider,
	MdCheckbox,
	MdMenu,
	MdSwitch,
	MdList } from 'vue-material/dist/components'

import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

// Vue Configurations
Vue.config.productionTip = false

// Vue Modules Setup
Vue.use(MdButton)
Vue.use(MdSnackbar)
Vue.use(MdField)
Vue.use(MdToolbar)
Vue.use(MdDrawer)
Vue.use(MdDivider)
Vue.use(MdCheckbox)
Vue.use(MdMenu)
Vue.use(MdSwitch)
Vue.use(MdList)

// Create event Bus
export const EventBus = new Vue();

// Vue Instance
new Vue({
  render: h => h(App),
}).$mount('#app')
