<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100" id="editor"></div>
    <DetailMenu class="md-layout-item"></DetailMenu>
    <md-button @click="run" class="md-fab af-fab">
      <md-icon>play_arrow</md-icon>
    </md-button>
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
  EventBus.$on('createNode', node => canvas.createNode(node))
  EventBus.$on('selectConnector', (node, connector) => canvas.createEdge(node, connector))
}

const run = function () {
  canvas.nodes[0].run()
}

export default {
  name: 'Editor',
  components: {
    DetailMenu
  },
  props: {
    msg: String
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
