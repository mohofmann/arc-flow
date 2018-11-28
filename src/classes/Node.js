/**************************************
 *	NODE
 *	serves as skeleton for
 *	drawable nodes on the canvas
 **************************************/

import 'lodash'
import SVG from 'svg.js'
import { EventBus } from '../main.js'

let sizeX = 250
let sizeY = 80
let radius = 10

export default class Node {

  constructor (canvas, attributes, watchCanvas) {
    this.body = null
    this.headline = null
    this.hint = null
    this._inputs = []
    this._outputs = []

    this._startDragging = false
    this._getsDragged = false
    this._canvas = canvas
    this._watchCanvas = watchCanvas
    this.createTile(attributes)
    this.addDefaultBehavior()
    this._watchCanvas()
  }

  remove = function () {
    this.element.remove()
    this._watchCanvas()
  }

  createTile = function (attributes) {
    this.element = this._canvas.group()
    this.body = this._canvas
      .rect(sizeX, sizeY)
      .radius(radius)
      .attr({fill: attributes.backgroundColor})
    this.element.add(this.body)
    this.element.add(this._canvas
      .rect(sizeX, 25)
      .radius(radius)
      .attr({fill: attributes.headerColor}))
    this.element.add(this._canvas
      .rect(sizeX, 10)
      .attr({fill: attributes.headerColor})
      .move(0, 15))
    this.element.add(this._canvas
      .circle(15, 15)
      .attr({fill: '#00000099', cursor: 'pointer'})
      .move(sizeX-20, 5))
    this.headline = this._canvas
      .text(attributes.title)
      .move(sizeX/2, 4)
      .font({
        family: 'Helvetica',
        anchor: 'middle',
        weight: '700'
      })
      .attr({fill: '#FFFFFF', cursor: 'default'})
    this.element.add(this.headline)
    this.hint = this._canvas
      .text(attributes.hint)
      .move(sizeX/2, sizeY/2)
      .font({
        family: 'Helvetica',
        anchor: 'middle',
        weight: '500'
      })
      .attr({fill: '#00000088', cursor: 'default'})
    this.element.add(this.hint)
  }

  nodeClickEvent = function () {
    // don't confuse click with dragmove event
    if (!this._gettingDragged) {
        EventBus.$emit('selectNode', this)
      }
    this._gettingDragged = false
    this._startDragging = false
  }

  nodeMoveEvent = function () {
    // ignore first emit of dragMove event
    if (this._startDragging) {
      this._gettingDragged = true
    } else {
      this._startDragging = true
    }
  }

  nodeRemoveEvent = function () {
    // delete Node upon button press
    this.remove()
  }

  showElement = function () {
    console.log(this.element)
  }

  setInputs = function (inputs) {
    // Remove existing inputs
    _.each(this._inputs, el => {
      el.remove()
    })
    this._inputs = []
    // Add every single input
    _.each(inputs, el => {
      let input = this._canvas.group()
      input.add(this._canvas
        .text(el)
        .move(sizeX - 20, 30 + this._inputs.length * 30)
        .attr({fill: '#00000099', cursor: 'default'})
        .font({anchor: 'end', weight: '600'}))
      input.add(this._canvas
        .circle(15, 15)
        .attr({fill: '#FFFFFF', cursor: 'pointer'})
        .move(sizeX - 7.5, 30 + this._inputs.length * 30))
      this.element.add(input)
      this._inputs.push(input)
    })
    // Adjust the tile size
    this.body.size(sizeX, sizeY + 21 * this._inputs.length)
  }


  addDefaultBehavior = function () {
    this.element.node.childNodes[3].instance.click(() => {
      this.nodeRemoveEvent()
    })
    this.element.on('dragmove', event => {
      this.nodeMoveEvent()
    })
    this.element.click(() => {
      this.nodeClickEvent()
    })
    this.element.draggable()
    // includes snap to grid
    // this.element.draggable((x,y) => {
    //   return {
    //     x: x - x % 20,
    //     y: y - y % 20
    //   }
    // })
  }

}