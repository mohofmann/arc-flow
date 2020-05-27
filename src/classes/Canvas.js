/**************************************
 *	CANVAS
 *	provides the graphical canvas
 *	environment for visual operations
 **************************************/

import SVG from 'svg.js'
import 'svg.draggable.js'
import 'svg.panzoom.js'
import { get, set } from 'idb-keyval'
import { saveAs } from 'file-saver';

import DataSource  from './nodes/DataSource.js'
import SqrMagnitude from './nodes/SqrMagnitude.js'
import Ringbuffer from './nodes/Ringbuffer.js'
import Segmentation from './nodes/Segmentation.js'
import PeakDetector from './nodes/PeakDetector.js'
import Segmentor from './nodes/Segmentor.js'
import MeanExtractor from './nodes/MeanExtractor.js'
/* PLOP: APPEND IMPORT */
import Start from './nodes/Start.js'
import KNN from './nodes/KNN.js'
import Max from './nodes/Max.js'
import Min from './nodes/Min.js'
import SVM from './nodes/SVM.js'
import FeatureTable from './nodes/FeatureTable.js'
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
  zoomMin: 0.1,
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
      .zoom(0.7)
      .click(event => {
        if (event.target.instance === this._canvas) {
          EventBus.$emit('deselectNode', null)
        }
      })
  }

  async saveProject () {
    let projectDefinition = {
      nodeDefinitions: [],
      edgeDefinitions: []
    }

    _.each(this.nodes, node => {
      let nodeDefinition = {
        name: null,
        id: null,
        config: null,
        x: null,
        y: null,
        inputs: [],
        outputs: []
      }
      nodeDefinition.name = node.constructor.name.toUpperCase()
      nodeDefinition.id = node.id
      nodeDefinition.config = node.config
      nodeDefinition.x = node.element.x()
      nodeDefinition.y = node.element.y()
      _.each(node.inputs, input => {
        nodeDefinition.inputs.push(input.name)
      })
      _.each(node.outputs, output => {
        nodeDefinition.outputs.push(output.name)
      })
      projectDefinition.nodeDefinitions.push(nodeDefinition)
    })

    _.each(this.edges, edge => {
      let edgeDefinition = {
        start: {
          node: edge._start.node.id,
          output: edge._start.id
        },
        end: {
          node: edge._end.node.id,
          input: edge._end.id
        }
      }
      projectDefinition.edgeDefinitions.push(edgeDefinition)
    })
    await set('projectDefinition', projectDefinition)
    console.log("Project saved.")
    this.downloadProject(projectDefinition, "project.arc")
  }

  downloadProject (object, fileName) {
    var fileToSave = new Blob([JSON.stringify(object)], {
      type: 'application/json',
      name: fileName
    });
    saveAs(fileToSave, fileName);
  }

  downloadObjectAsJson (exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  // TODO: Fix unability to create edges vice versa (from input to output)
  async loadProject () {
    let projectDefinition = await get('projectDefinition')

    _.each(projectDefinition.nodeDefinitions, nodeDefinition => {
      this.createNode(nodeDefinition.name)
      let node = _.last(this.nodes)
      node.id = nodeDefinition.id
      node.setInputs(nodeDefinition.inputs)
      node.setOutputs(nodeDefinition.outputs)
      node.configure(nodeDefinition.config)
      node.element.move(nodeDefinition.x, nodeDefinition.y)
    })

    _.each(projectDefinition.edgeDefinitions, edgeDefinition => {
      this.createEdge(this.findNode(edgeDefinition.start.node).outputs[edgeDefinition.start.output])
      this.createEdge(this.findNode(edgeDefinition.end.node).inputs[edgeDefinition.end.input])
    })
  }

  // Finds a node by its id
  findNode (id) {
    return _.find(this.nodes, node => {
      return node.id == id
    })
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
      case 'START': node = new Start(this._canvas, this.watchCanvas); break
      case 'KNN': node = new KNN(this._canvas, this.watchCanvas); break
      case 'MAX': node = new Max(this._canvas, this.watchCanvas); break
      case 'MIN': node = new Min(this._canvas, this.watchCanvas); break
      case 'SVM': node = new SVM(this._canvas, this.watchCanvas); break
      case 'FEATURETABLE': node = new FeatureTable(this._canvas, this.watchCanvas); break
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

  removeNode (node) {
    _.each(node.inputs, input => {
      input.edge && input.edge.remove()
    })
    _.each(node.outputs, output => {
      output.edge && output.edge.remove()
    })
    _.remove(this.nodes, n => {
      // console.log(node.element.node.id)
      // console.log(this.element.node.id)
      return n.element.node.id == node.element.node.id
    })

    node.element.remove()
    this.watchCanvas()
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