<template>
  <div class="md-layout">
    <md-snackbar md-position="center" :md-duration="1000" :md-active.sync="showProgress" md-persistent>
      <span>Flow is running..</span>
    </md-snackbar>
    <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="showSuccess" md-persistent>
      <span>Flow successfully executed</span>
    </md-snackbar>
    <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="showError" md-persistent>
      <span>Flow execution failed</span>
    </md-snackbar>
    <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showLoading" md-persistent>
      <span>Project is loading..</span>
    </md-snackbar>
    <div class="md-layout-item md-size-100" id="editor"></div>
    <DetailMenu class="md-layout-item"></DetailMenu>
  </div>
</template>

<script>
import 'lodash'
import { EventBus } from '../main.js'
import Canvas from '../classes/Canvas.js'
import DetailMenu from './DetailMenu.vue'

let canvas = null

const setupEditor = function () {
  canvas = new Canvas()
}

const setupEvents = function () {
  // TODO: investigate why sometimes (loadCanvas) arrow funcs are necessary
  EventBus.$on('runFlow', async () => {
    this.showProgress = true
    setTimeout(this.run, 500)
  })
  EventBus.$on('createNode', node => canvas.createNode(node))
  EventBus.$on('removeNode', node => canvas.removeNode(node))
  EventBus.$on('selectConnector', (node, connector) => canvas.createEdge(node, connector))
  EventBus.$on('loadProject', () => {this.showLoading = true; canvas.loadProject()})
  EventBus.$on('saveProject', () => canvas.saveProject())
}

const run = async function () {
  console.log("running")
  // TODO: Use refs for vue-like behavior
  document.getElementById("log").innerHTML = "";
  _.each(canvas.nodes, node => {
    node._preperform()
  })
  try {
    this.showProgress = true
    canvas.nodes[0].run()
    EventBus.$emit('setTab', 'analytics-tab')
    // this.showSuccess = true
  }
  catch (error) {
    // this.showError = true
    console.log("There was an error", error)
  }
}

export default {
  name: 'Editor',
  components: {
    DetailMenu
  },
  props: {
    msg: String
  },
  data: function () {
    return {
      showError: false,
      showProgress: false,
      showSuccess: false,
      showLoading: false
    }
  },
  methods: {
    run: run
  },
  mounted: setupEditor,
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
