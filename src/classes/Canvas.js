/**************************************
 *	CANVAS
 *	provides the graphical canvas
 *	environment for visual operations
 **************************************/

import SVG from 'svg.js'
import 'svg.draggable.js'
import 'svg.panzoom.js'
import { get } from 'idb-keyval' 

import DataSource  from './nodes/DataSource.js'
import SqrMagnitude from './nodes/SqrMagnitude.js'
import Ringbuffer from './nodes/Ringbuffer.js'
import Segmentation from './nodes/Segmentation.js'
import PeakDetector from './nodes/PeakDetector.js'
import Segmentor from './nodes/Segmentor.js'
import MeanExtractor from './nodes/MeanExtractor.js'
/* PLOP: APPEND IMPORT */
import EventLabeler from './nodes/EventLabeler.js'
import Magnitude from './nodes/Magnitude.js'
import Splitter from './nodes/Splitter.js'
import Log from './nodes/Log.js'
import Selector from './nodes/Selector.js'
import FeatureVector from './nodes/FeatureVector.js'
import SmaExtractor from './nodes/SmaExtractor.js'
import MedianExtractor from './nodes/MedianExtractor.js'

import Edge from './Edge.js'
import { EventBus } from '../main.js'

const domId = 'editor'
const sizeX = '100%'
const sizeY = '100%'
const panZoomSettings = {
  zoomMin: 0.3,
  zoomMax: 1.3
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
      .zoom(0.8)
      .click(event => {
        if (event.target.instance === this._canvas) {
          EventBus.$emit('deselectNode', null)
        }
      })
    // this._canvas.line(97, -1000, 98, 1000)
    // .stroke({ width: 2, color: '#4687CC' })
    // .style({ cursor: 'ew-resize', 'stroke-dasharray': '2'})
    // this._canvas.line(100, -1000, 100, 1000)
    // .stroke({ width: 2, color: '#CF0053' })
    // .style({ cursor: 'ew-resize', 'stroke-dasharray': '2'})
    // this._canvas.text("WEARABLE")
    // .font({size: 32, anchor: 'end', weight: '600'})
    // .fill({color: '#4687CC', opacity: '0.7'})
    // .move(100-20, 0)
    // this._canvas.text("SMARTPHONE")
    // .font({size: 32, anchor: 'start', weight: '600'})
    // .fill({color: '#CF0053', opacity: '0.7'})
    // .move(100+20, 0)
  }

  loadSamples = function () {
    get('samples').then(val => {
      return val
    })
  }

  async loadCanvas () {
    let data = await get('samples')
    console.log(data)

    this.createNode('DATASOURCE')
    this.createNode('RINGBUFFER')
    this.createNode('SPLITTER')
    this.createNode('SELECTOR')
    this.createNode('MAGNITUDE')
    this.createNode('PEAKDETECTOR')
    this.createNode('LOG')
    this.createNode('SEGMENTATION')
    this.createNode('SPLITTER')
    this.createNode('MEANEXTRACTOR')
    this.createNode('MEDIANEXTRACTOR')
    this.createNode('LOG')
    this.createNode('LOG')

    _.each(this.nodes, (node, index) => {
      let y = Math.random() * (300 - 100) + 100;
      node.element.move(index * 300, y)
    })

    this.nodes[0].setData(data)
    this.nodes[3].setAttributes(data.data[0], ["ax", "ay", "az"])
    data = null
    this.nodes[5].config.minPeakHeight = 0.8
    this.nodes[5].config.minPeakDistance = 100
    this.nodes[7].updateNode(50, 50, 200)

    this.createEdge(this.nodes[0].outputs[0])
    this.createEdge(this.nodes[1].inputs[0])
    this.createEdge(this.nodes[1].outputs[0])
    this.createEdge(this.nodes[2].inputs[0])
    this.createEdge(this.nodes[2].outputs[0])
    this.createEdge(this.nodes[3].inputs[0])
    this.createEdge(this.nodes[3].outputs[0])
    this.createEdge(this.nodes[4].inputs[0])
    this.createEdge(this.nodes[4].outputs[0])
    this.createEdge(this.nodes[5].inputs[0])
    this.createEdge(this.nodes[2].outputs[1])
    this.createEdge(this.nodes[7].inputs[0])
    this.createEdge(this.nodes[5].outputs[1])
    this.createEdge(this.nodes[6].inputs[0])
    this.createEdge(this.nodes[6].outputs[0])
    this.createEdge(this.nodes[7].inputs[1])
    this.createEdge(this.nodes[7].outputs[0])
    this.createEdge(this.nodes[8].inputs[0])
    this.createEdge(this.nodes[8].outputs[0])
    this.createEdge(this.nodes[9].inputs[0])
    this.createEdge(this.nodes[8].outputs[1])
    this.createEdge(this.nodes[10].inputs[0])
    this.createEdge(this.nodes[9].outputs[0])
    this.createEdge(this.nodes[11].inputs[0])
    this.createEdge(this.nodes[10].outputs[0])
    this.createEdge(this.nodes[12].inputs[0])

    console.log(this.nodes)
    console.log(this.edges)
  }

  createEdge = function (connector) {
    // On first connector, only create edge without drawing it
    if (!this.edgeInConstruction) {
      this.edgeInConstruction = new Edge(this._canvas, connector)
      connector.setEdge(this.edgeInConstruction)
      // Add event so edge follows mouse
      this._canvas.on('mousemove', evt => {
        this.edgeInConstruction.followMouse(this._canvas.point(evt.clientX, evt.clientY))
      })
    // As soon as second connector selected, actually draw edge between
    } else {
      connector.setEdge(this.edgeInConstruction)
      if (this.edgeInConstruction.setEnd(connector)) {
        this.edges.push(this.edgeInConstruction)
      } else {
        this.edgeInConstruction.remove()
      }
      this.edgeInConstruction = null
      this._canvas.off('mousemove')
    }
  }

  createNode = function (nodeName) {
    // eslint-disable-next-line
    let node = null
    switch (nodeName) {
      case 'DATASOURCE': node = new DataSource(this._canvas, this.watchCanvas); break
      case 'RINGBUFFER': node = new Ringbuffer(this._canvas, this.watchCanvas); break
      case 'SEGMENTATION': node = new Segmentation(this._canvas, this.watchCanvas); break
      case 'SQRMAGNITUDE': node = new SqrMagnitude(this._canvas, this.watchCanvas); break
      case 'PEAKDETECTOR': node = new PeakDetector(this._canvas, this.watchCanvas); break
      case 'SEGMENTOR': node = new Segmentor(this._canvas, this.watchCanvas); break
      case 'MEANEXTRACTOR': node = new MeanExtractor(this._canvas, this.watchCanvas); break
      /* PLOP: APPEND CASE */
      case 'EVENTLABELER': node = new EventLabeler(this._canvas, this.watchCanvas); break
      case 'MAGNITUDE': node = new Magnitude(this._canvas, this.watchCanvas); break
      case 'SPLITTER': node = new Splitter(this._canvas, this.watchCanvas); break
      case 'LOG': node = new Log(this._canvas, this.watchCanvas); break
      case 'SELECTOR': node = new Selector(this._canvas, this.watchCanvas); break
      case 'FEATUREVECTOR': node = new FeatureVector(this._canvas, this.watchCanvas); break
      case 'SMAEXTRACTOR': node = new SmaExtractor(this._canvas, this.watchCanvas); break
      case 'MEDIANEXTRACTOR': node = new MedianExtractor(this._canvas, this.watchCanvas); break
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