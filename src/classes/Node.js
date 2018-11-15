/**************************************
 *	NODE
 *	serves as skeleton for
 *	drawable nodes on the canvas
 **************************************/

import SVG from 'svg.js'
import { EventBus } from '../main.js'

let sizeX = 250
let sizeY = 125
let radius = 10

export default class Node {

  constructor (canvas, attributes, watchCanvas) {
    this._gettingDragged = false
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
    this.element.add(this._canvas
      .rect(sizeX, sizeY)
      .radius(radius)
      .attr({fill: attributes.backgroundColor}))
    this.element.add(this._canvas
      .rect(250, 25)
      .radius(radius)
      .attr({fill: attributes.headerColor}))
    this.element.add(this._canvas
      .rect(250, 10)
      .attr({fill: attributes.headerColor})
      .move(0, 15))
    this.element.add(this._canvas
      .circle(15, 15)
      .attr({fill: '#00000099', cursor: 'pointer'})
      .move(230, 5))
    this.element.add(this._canvas
      .text(attributes.title)
      .move(125, 4)
      .font({
        family: 'Helvetica',
        anchor: 'middle',
        weight: '700'
      })
      .attr({fill: '#FFFFFF', cursor: 'default'}))
    this.element.add(this._canvas
      .text(attributes.hint)
      .move(125, 60)
      .font({
        family: 'Helvetica',
        anchor: 'middle',
        weight: '500'
      })
      .attr({fill: '#00000088', cursor: 'default'}))
  }

  nodeSelectedEvent = function () {
    // console.log('node selected')
    // Don't confuse getting dragged with node selection
    // if (!this._gettingDragged) {
      EventBus.$emit('selectNode', this.element)
    // }
  }

  addDefaultBehavior = function () {
    this.element.node.childNodes[3].instance.click(() => {
      this.remove()
    })
    this.element.on('dragstart', event => {
      console.log('dragging starts')
      this._gettingDragged = true
    })
    this.element.on('dragmove', event => {
      console.log('dragging in progress')
      this._gettingDragged = true
    })
    this.element.on('dragend', event => {
      console.log('dragging ended')
      this._gettingDragged = false
    })
    this.element.click(() => {
      this.nodeSelectedEvent()
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