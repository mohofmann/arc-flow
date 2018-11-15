/**************************************
 *	CANVAS
 *	provides the graphical canvas
 *	environment for visual operations
 **************************************/

import SVG from 'svg.js'
import Node from './Node.js'
import DataSource  from './DataSource.js'
import Preprocessor from './Preprocessor.js'

const domId = 'editor'
const sizeX = '100%'
const sizeY = '100%'
const panZoomSettings = {
  zoomMin: 0.5,
  zoomMax: 1.5
}
const style = 'background-color: #161616; background-size: 20px 20px, 20px 20px; background-position: -1px -1px, -1px -1px; background-image: -webkit-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -webkit-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: -moz-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), -moz-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px); background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);'

export default class Canvas {

  // creates an empty SVG canvas based on the configuration above
	constructor () {
    this._canvas = new SVG(domId)
      .size(sizeX, sizeY)
      .style(style)
  }

  createElement = function (elementName) {
    let node = null
    switch (elementName) {
      case 'DATASOURCE': node = new DataSource(this._canvas, this.watchCanvas); break
      case 'PREPROCESSOR': node = new Preprocessor(this._canvas, this.watchCanvas); break
      default: break
    }
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