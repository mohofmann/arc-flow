/**************************************
 *	NODE
 *	serves as skeleton for
 *	drawable nodes on the canvas
 **************************************/

import _ from 'lodash'
import { EventBus } from '../main.js'

let sizeX = 250
let sizeY = 80
let radius = 10

export default class Node {

  constructor (canvas, attributes, watchCanvas) {
    this.body = null
    this.headline = null
    this.hint = null
    this._inputs = []
    this._outputs = []

    this._startDragging = false
    this._getsDragged = false
    this._canvas = canvas
    this._watchCanvas = watchCanvas
    this.createTile(attributes)
    this.addDefaultBehavior()
    this._watchCanvas()
  }

  // TODO: also remove edge references in inputs & outputs
  remove = function () {
    _.each(this._inputs, input => {
      input.edge && input.edge.remove()
    })
    _.each(this._outputs, output => {
      output.edge && output.edge.remove()
    })
    this.element.remove()
    this._watchCanvas()
  }

  run = function () {
    // Only execute computation if every input has data
    if (_.every(this._inputs, 'data')) {
      console.log('running and all data present');
    } else {
      console.log('refusing run as data missing');
    }
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
      .move(sizeX/2, sizeY/2 + 2)
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
      _.each(this._inputs, input => {
        input.edge && input.edge.updatePosition()
      })
      _.each(this._outputs, output => {
        output.edge && output.edge.updatePosition()
      })
    } else {
      this._startDragging = true
    }
  }

  nodeRemoveEvent = function (event) {
    // delete Node upon button press
    this.remove()
    event.stopPropagation()
  }

  showElement = function () {
    //
  }

  connectorClickEvent = function (event) {
    EventBus.$emit('selectConnector', this, event.target.instance)
    event.stopPropagation()
  }

  // TODO: DRY setInputs and setOutputs functions
  setInputs = function (inputs) {
    // Remove existing inputs
    _.each(this._inputs, el => {
      el.element.remove()
    })
    this._inputs = []
    // Add every single input
    _.each(inputs, el => {
      let input = this._canvas.group()
      let text = this._canvas
        .text(el)
        .move(20, 42 + this._inputs.length * 30)
        .attr({fill: '#00000099', cursor: 'default'})
        .font({anchor: 'start', weight: '600'})
      let connector = this._canvas
        .circle(15, 15)
        .attr({fill: '#FFFFFF', cursor: 'pointer'})
        .move(-7.5, 42 + this._inputs.length * 30)
      input.add(text)
      input.add(connector)
      input.click(event => {
        this.connectorClickEvent(event)
      })
      this.element.add(input)
      this._inputs.push({element: input, edge: null, data: null })
    })
    // Adjust the tile size
    if (this._inputs.length > 0) {
      this.body.size(sizeX, sizeY + 30 * this._inputs.length - 30)
    } else {
      this.body.size(sizeX, sizeY)
    }
  }

  setOutputs = function (outputs) {
    // Remove existing inputs
    _.each(this._outputs, el => {
      el.element.remove()
    })
    this._outputs = []
    // Add every single input
    _.each(outputs, el => {
      let output = this._canvas.group()
      let text = this._canvas
        .text(el)
        .move(sizeX - 20, 42 + this._outputs.length * 30)
        .attr({fill: '#00000099', cursor: 'default'})
        .font({anchor: 'end', weight: '600'})
      let connector = this._canvas
        .circle(15, 15)
        .attr({fill: '#FFFFFF', cursor: 'pointer'})
        .move(sizeX - 7.5, 42 + this._outputs.length * 30)
      output.add(text)
      output.add(connector)
      output.click(event => this.connectorClickEvent(event))
      this.element.add(output)
      this._outputs.push({element: output, edge: null})
    })
    // Adjust the tile size
    if (this._outputs.length > 0) {
      this.body.size(sizeX, sizeY + 30 * this._outputs.length - 30)
    } else {
      this.body.size(sizeX, sizeY)
    }
  }

  // sets a given node's connector to a new edge
  setEdge = function (connector, edge) {
    this._inputs.find( el => {
      if (el.element.get(1) == connector) {
        el.edge = edge
      }
    })
    this._outputs.find( el => {
      if (el.element.get(1) == connector) {
        el.edge = edge
      }
    })
  }

  // returns the node's connector for a given edge
  findConnector = function (edge) {
    let result = null
    this._inputs.find( input => {
      if (input.edge == edge) {
        result = input.element.get(1)
      }
    })
    this._outputs.find( output => {
      if (output.edge == edge) {
        result = output.element.get(1)
      }
    })
    return result
  }

  addDefaultBehavior = function () {
    this.element.node.childNodes[3].instance.click(event => this.nodeRemoveEvent(event))
    this.element.on('dragmove', () => {
      this.nodeMoveEvent()
    })
    this.element.click(element => {
      this.nodeClickEvent(element)
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