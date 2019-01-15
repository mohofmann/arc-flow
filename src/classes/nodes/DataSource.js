/**************************************
 *	DATA SOURCE
 *	inherits from Node, enabling
 *	data input for the chain
 **************************************/

import Node from '../Node.js'
import _ from 'lodash'

let attributes = {
	backgroundColor: '#57A9FF',
	headerColor: '#4687CC',
	title: 'Data Source',
	hint: 'Click to add Data'
}
 
export default class DataSource extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.data = null
		this.name = ""
		this.features = []
		this._index = 0
	}

	setData = function (data) {
		this.data = data
		this.updateNode()
		this.setFeatures(this.data.data[0])
	}

	setFeatures = function (features) {
		this.features = features
		this.setOutputs(features)
	}

	updateNode = function () {
		this.hint.text("")
		this.headline.text(attributes.title + ' (CSV)')
	}

	_runSuccessors () {
		// Empty function as datasource acts as initial
		// clock and runs successor nodes not once but for every
		// data row (see _perform function)
	}

	_perform () {
		this._index += 1 // Skip first row containing labels
		_.each(this.data.data, row => {
			_.each(this.outputs, (output, index) => {
				if (output.edge) {
					output.edge._end.data = row[index]
					// Run successor nodes once for each parsed row
					output.edge._end.node.run()
				}
			})
		})
		console.log("Flow execution done.");
	}

}