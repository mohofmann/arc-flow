/**************************************
 *	DATA SOURCE
 *	inherits from Node, enabling
 *	data input for the chain
 **************************************/

import Node from '../Node.js'

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

	_perform = function () {
		this._index += 1 // Skip first row containing labels
		console.log(this.data)
		console.log(this.features)
		console.log(this._outputs)
		// _.each(this.data.data, function (row) {
		// 	_.each(this._outputs, function (output, index) {
		// 		output.edge.
		// 	})
		// })
	}

}