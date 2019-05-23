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
	MdList,
	MdTooltip,
	MdSubheader,
	MdTabs } from 'vue-material/dist/components'

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
Vue.use(MdTooltip)
Vue.use(MdSubheader)
Vue.use(MdTabs)

// Create event Bus
export const EventBus = new Vue();


let cycleLogged = false
// Enable DOM Console Log Behavior
const baseLogFunction = console.log;
console.log = function () {
	cycleLogged = true
  baseLogFunction.apply(console, arguments);
  let args = Array.prototype.slice.call(arguments);
  for ( var i=0; i<args.length; i++) {
  	if (Array.isArray(args[i])) {
  		_.each(args[i], el => {
  			applyNode(JSON.stringify(el))
  		})
  	} else {
  		applyNode(args[i])
  	}
  }
}

console.clearLog = function () {
	if (cycleLogged) {
		console.log("----------------------------")
		cycleLogged = false
	}
}

function applyNode (message) {
	let node = createLogNode(message)
	let br = document.createElement("BR")
	document.querySelector("#log").appendChild(node)
}

function createLogNode (message) {
  var node = document.createElement("p");
  var textNode = document.createTextNode(message);
  node.appendChild(textNode);
  return node;
}

// Vue Instance
new Vue({
  render: h => h(App),
}).$mount('#app')
