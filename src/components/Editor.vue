<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100" id="editor"></div>
    <DetailMenu class="af-column-padding"></DetailMenu>
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
  EventBus.$on('createElement', node => canvas.createElement(node))
}

export default {
  name: 'Editor',
  components: {
    DetailMenu
  },
  props: {
    msg: String
  },
  mounted: setupEditor,
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
