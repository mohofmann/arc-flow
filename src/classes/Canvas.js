/**************************************
 *	CANVAS
 *	provides the graphical canvas
 *	environment for visual operations
 **************************************/

import SVG from 'svg.js'
import 'svg.draggable.js'
import 'svg.panzoom.js'

import DataSource  from './nodes/DataSource.js'
import Preprocessor from './nodes/Preprocessor.js'
import Memory from './nodes/Memory.js'
import Edge from './Edge.js'
import { EventBus } from '../main.js'

const domId = 'editor'
const sizeX = '100%'
const sizeY = '100%'
const panZoomSettings = {
  zoomMin: 0.5,
  zoomMax: 1.5
}

const style = 'background-color: #161616; background-size: 20px 20px, 20px 20px; background-position: -1px -1px, -1px -1px; background-image: -webkit-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -webkit-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: -moz-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -moz-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);'

export default class Canvas {

  nodes = []
  edges = []
  edgeInConstruction = null

  // creates an empty SVG canvas based on the configuration above
	constructor () {
    this._canvas = new SVG(domId)
      .size(sizeX, sizeY)
      .style(style)
      .click(event => {
        if (event.target.instance === this._canvas) {
          EventBus.$emit('deselectNode', null)
        }
      })
  }

  createEdge = function (connector) {
    // On first connector, only create edge without drawing it
    if (!this.edgeInConstruction) {
      this.edgeInConstruction = new Edge(this._canvas, connector)
      // TODO: DRY the node.setEdge 2 times in function
      connector.setEdge(this.edgeInConstruction)
    // As soon as second connector selected, actually draw edge between
    } else {
      connector.setEdge(this.edgeInConstruction)
      this.edgeInConstruction.setEnd(connector)
      this.edges.push(this.edgeInConstruction)
      this.edgeInConstruction = null
    }
  }

  createNode = function (nodeName) {
    // eslint-disable-next-line
    let node = null
    switch (nodeName) {
      case 'DATASOURCE': node = new DataSource(this._canvas, this.watchCanvas); break
      case 'PREPROCESSOR': node = new Preprocessor(this._canvas, this.watchCanvas); break
      case 'MEMORY': node = new Memory(this._canvas, this.watchCanvas); break
      default: break
    }
    this.nodes.push(node)
  }

  watchCanvas = function () {
    // Disables pan and zoom for the canvas if empty
    if (this._canvas.node.childElementCount == 1) {
      this._canvas.panZoom(false)
    }
    else if (this._canvas.node.childElementCount > 1) {
      this._canvas.panZoom(panZoomSettings)
    }
}

}