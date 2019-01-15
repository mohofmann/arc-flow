/**************************************
 *	CONNECTOR
 *	acts as an input or output to
 *	connect nodes through edges 
 **************************************/

import SVG from 'svg.js'
import { EventBus } from '../main.js'

const circleSize = 15
const horizontalMargin = 20
const verticalMargin = 42
const height = 30

export default class Connector {

  constructor (canvas, node, name, type) {
  	this._canvas = canvas
    this.node = node
  	this.data = null
  	this.edge = null
    this.name = name
  	this.element = null

  	let circlePos = type === 'INPUT' ? -7.5 : node.sizeX - 7.5
    let textPos = type === 'INPUT' ? 20 : node.sizeX - 20
    let verticalPos = type === 'INPUT' ? node.inputs.length : node.outputs.length
    let anchor = type === 'INPUT' ? 'start' : 'end'

    this.element = canvas.group()
    let text = canvas
      .text(this.name)
      .move(textPos, verticalMargin + verticalPos * height)
      .attr({fill: '#00000099', cursor: 'default'})
      .font({anchor: anchor, weight: '600'})
    let connector = canvas
      .circle(circleSize, circleSize)
      .attr({fill: '#FFFFFF', cursor: 'pointer'})
      .move(circlePos, verticalMargin + verticalPos * height)
    this.element.add(text)
    this.element.add(connector)
    this.element.click(event => {
      this.connectorClickEvent(event)
    })
    node.element.add(this.element)
  }

  connectorClickEvent = function (event) {
    EventBus.$emit('selectConnector', this, event.target.instance)
    event.stopPropagation()
  }

  setEdge = function (edge) {
  	this.edge = edge
  }

  getPos = function () {
  	let rbox = this.element.get(1).rbox(this._canvas)
  	return {
  		x: rbox.cx,
  		y: rbox.cy
  	}
  }

}