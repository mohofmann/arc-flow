/**************************************
 *	DATA SOURCE
 *	inherits from Node, enabling
 *	data input for the chain
 **************************************/

import Node from '../Node.js'
import { EventBus } from '../../main.js'
import _ from 'lodash'

let attributes = {
	backgroundColor: '#57A9FF',
	headerColor: '#4687CC',
	title: 'Data Source',
	hint: 'Click to add Data',
	description: 'Imports and parses a table containing sensor data and outputs it sample by sample'
}
 
export default class DataSource extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.data = null
		this.name = ""
		this.description = attributes.description
		this.features = []
		this._featureIndices = []
		this._index = 0

		this.detailMenu = 'DataSourceMenu'
	}

	setData (data) {
		this.data = data
		this.features = this.data.data[0]
		console.log(this.features)
		this.setOutputs(['Data (' + this.features.length + ' axes)'])
		this.updateNode()
	}

	_setFeatureIndices () {
		this._featureIndices = []
		_.each(this.features, feature => {
			this._featureIndices.push(_.findIndex(this.data.data[0], o => { return o == feature}))
		})
	}

	getAttributes () {
		return this.features
	}

	// setFeatures = function (features) {
	// 	this.features = features
	// 	this._setFeatureIndices()
	// 	this.setOutputs(features)
	// }

	updateNode = function () {
		this.hint.text("")
		this.headline.text(attributes.title + ' (CSV)')
	}

	_runSuccessors () {
		// Empty function as datasource acts as initial
		// clock and runs successor nodes not once but for every
		// data row (see _perform function)
	}

	_log (args) {
		console.log("Row Output is " + args.data)
	}

	_perform () {
		let data = _.tail(this.data.data)

		_.each(data, async row => {
			this.log({data: row})
			let output = this.outputs[0]
			if (output.edge) {
				output.edge._end.data = row
				// Run successor nodes once for each parsed row
				output.edge._end.node.run()
			}
		})
		console.log("Flow execution done.");
	}

}