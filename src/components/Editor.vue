<template>
  <b-row class="h-100" style="margin: 0">
    <b-col style="padding: 0">
      <div id="editor"></div>
    </b-col>
    <b-col cols="5" lg="2" sm="3" class="layout-detailmenu">
      <DetailMenu></DetailMenu>
    </b-col>
  </b-row>
</template>

<script>
import SVG from 'svg.js'
import 'lodash'
import 'svg.draggable.js'
import 'svg.panzoom.js'
import { EventBus } from '../main.js'
import Canvas from '../classes/Canvas.js'
import DetailMenu from './DetailMenu.vue'

let canvas = null

const setupEditor = function () {
  canvas = new Canvas()
}

const setupEvents = function () {
  EventBus.$on('createElement', element => canvas.createElement(element))
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
  #editor {
    height: 100%;
    width: 100%;
  }

  .layout-detailmenu {
    padding: 0;
    margin: 0;
  }
</style>
