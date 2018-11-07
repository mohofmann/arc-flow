<template>
  <div id="editor"></div>
</template>

<script>
import SVG from 'svg.js'
import 'lodash'
import 'svg.draggable.js'
import 'svg.panzoom.js'
import { EventBus } from '../main.js'

const panZoomSettings = {
  zoomMin: 0.5,
  zoomMax: 1.5
}

let draw = null
let empty = true
let elements = []

const setupEditor = function () {
  draw = SVG('editor')
    .size('100%', '100%')
    .style('background-color: #222222; background-size: 20px 20px, 20px 20px; background-position: -1px -1px, -1px -1px; background-image: -webkit-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -webkit-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: -moz-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -moz-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);')
}

// Watches the canvas and reacts accordingly
const watchCanvas = function () {
  // Disables pan and zoom for the canvas if empty
  if (_.size(draw.children()) == 1 && !empty) {
    empty = true
    draw.panZoom(false)
  }
  else if (_.size(draw.children()) > 1 && empty) {
    empty = false
    draw.panZoom(panZoomSettings)
  }
}

const createElement = function (elementName) {
  const removeElement = function (element) {
    element.remove()
    watchCanvas()
  }

  let element = null
  switch (elementName) {
    case 'BOX': element = draw.rect(100, 100).attr({ fill: '#f06' }); break
    case 'CIRCLE': element = draw.circle(120, 120).attr({ fill: '#f60' }); break
    default: break
  }
  element.dblclick(() => {
    // element.remove()
    removeElement(element)
  })
  element.draggable()
  elements.push(element)
  watchCanvas()
}

const setupEvents = function () {
  EventBus.$on('createElement', element => createElement(element))
}

export default {
  name: 'Editor',
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
</style>
