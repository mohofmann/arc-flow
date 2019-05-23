/**************************************
 *	NODE
 *	serves as skeleton for
 *	drawable nodes on the canvas
 **************************************/

import _ from 'lodash'
import JStat from 'jStat'
import Connector from './Connector.js'
import { EventBus } from '../main.js'

const sizeX = 250
const sizeY = 80
const radius = 10

export default class Node {

  constructor (canvas, attributes, watchCanvas) {
    this.body = null
    this.headline = null
    this.hint = null
    this.logging = false
    this.inputs = []
    this.outputs = []
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.config = {}

    this.backgroundColor = attributes.backgroundColor

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
    _.each(this.inputs, input => {
      input.edge && input.edge.remove()
    })
    _.each(this.outputs, output => {
      output.edge && output.edge.remove()
    })
    this.element.remove()
    this._watchCanvas()
  }

  // Checks if all conditions for execution are given and then
  // calls the _perform function
  run = function () {
    // Only execute computation if every input got data
    if (_.every(this.inputs, 'data')) {
      this._perform()
      // After performing, input data gets resetted
      _.each(this.inputs, input => {
        input.data = null
      })
      // And every output requests execution of the successors
      this._runSuccessors()
    } else {
      //
    }
  }

  // Tries recursively to get the data attribute structure
  getAttributes () {
    let attributes = null
    _.each(this.inputs, input => {
      if (input.edge) {
        attributes = input.edge._start.node.getAttributes()
      }
    })
    return attributes
  }

  sendMessage (index, data) {
    if (this.outputs[index].edge) {
      this.outputs[index].edge._end.data = data
    }
  }

  log (args) {
    this.logging && this._log(args)
  }

  _log (args) {
    // To be overwritten by every implementation
  }

  _runSuccessors () {
    _.each(this.outputs, output => {
      output.edge && output.edge._end.node.run()
    })
  }

  _preperform () {
    // Gets executed once for each node
    // before flow gets executed
  }

  _perform () {
    // Perform behavior should be customly overwritten
    // by every node implementation
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
    // Now use magic to position the node in the current canvas center
    let point = this._canvas.point(window.innerWidth / 2, window.innerHeight / 2)
    this.element.move(point.x, point.y)
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
      _.each(this.inputs, input => {
        input.edge && input.edge.updatePosition()
      })
      _.each(this.outputs, output => {
        output.edge && output.edge.updatePosition()
      })
    } else {
      this._startDragging = true
    }
  }

  nodeRemoveEvent = function (event) {
    // delete Node upon button press
    // TODO: Also delete Node out of canvas' node list
    this.remove()
    event.stopPropagation()
  }

  showElement = function () {
    //
  }

  setInputs = function (inputs) {
    // Remove existing inputs
    this.resetConnectors(this.inputs)
    this.inputs = []
    // Add every single input
    _.each(inputs, el => {
      let connector = new Connector(this._canvas, this, el, 'INPUT')
      this.inputs.push(connector)
    })
    // Adjust the tile size
    this.adjustHeight()
  }

  setOutputs = function (outputs) {
    // Remove existing inputs
    this.resetConnectors(this.outputs)
    this.outputs = []
    // Add every single input
    _.each(outputs, el => {
      let connector = new Connector(this._canvas, this, el, 'OUTPUT')
      this.outputs.push(connector)
    })
    // Adjust the tile size
    this.adjustHeight()
  }

  resetConnectors = function (connectors) {
    _.each(connectors, connector => {
      connector.element.remove()
      connector.edge && connector.edge.remove()
    })
  }

  adjustHeight = function () {
    const connectorCount = Math.max(this.inputs.length, this.outputs.length)
    if (connectorCount > 0) {
      this.body.size(sizeX, sizeY + 30 * connectorCount - 30)
    } else {
      this.body.size(sizeX, sizeY)
    }
  }

  // sets a given node's connector to a new edge
  setEdge = function (connector, edge) {
    this.inputs.find( el => {
      if (el.element.get(1) == connector) {
        el.edge = edge
      }
    })
    this.outputs.find( el => {
      if (el.element.get(1) == connector) {
        el.edge = edge
      }
    })
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