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
    this.type = type

    console.log(node.backgroundColor)

  	this._circlePos = this.type === 'INPUT' ? -7.5 : node.sizeX - 7.5
    this._textPos = this.type === 'INPUT' ? 20 : node.sizeX - 20
    this._verticalPos = this.type === 'INPUT' ? node.inputs.length : node.outputs.length
    this._anchor = this.type === 'INPUT' ? 'start' : 'end'

    this.element = canvas.group()
    let text = canvas
      .text(this.name)
      .move(this._textPos, verticalMargin + this._verticalPos * height)
      .attr({fill: '#00000099', cursor: 'default'})
      .font({anchor: this._anchor, weight: '600'})
    let connector = canvas
      .circle(circleSize, circleSize)
      .attr({fill: '#FFFFFF', cursor: 'pointer'})
      .move(this._circlePos, verticalMargin + this._verticalPos * height)
    let innerCircle = canvas
      .circle(circleSize-6, circleSize-6)
      .attr({fill: node.backgroundColor, cursor: 'pointer'})
      .move(this._circlePos+3, verticalMargin + this._verticalPos * height + 3)
    this.element.add(text)
    connector.click(event => {
      this.connectorClickEvent(event)
    })
    innerCircle.click(event => {
      this.connectorClickEvent(event)
    })
    this.element.add(connector)
    this.element.add(innerCircle)
    // this.element.click(event => {
    //   this.connectorClickEvent(event)
    // })
    node.element.add(this.element)
  }

  connectorClickEvent = function (event) {
    EventBus.$emit('selectConnector', this, event.target.instance)
    event.stopPropagation()
  }

  setLabel (label) {
    this.element.first()
      .text(label)
      .move(this._textPos, verticalMargin + this._verticalPos * height)
      .attr({fill: '#00000099', cursor: 'default'})
      .font({anchor: this._anchor, weight: '600'})
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