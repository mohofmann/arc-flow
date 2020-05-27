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
	hint: '',
	description: 'Imports and parses a table containing sensor data and outputs it sample by sample'
}

let samples = 0
 
export default class DataSource extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.name = ""
		this.description = attributes.description
		this._index = 0
		this.detailMenu = 'DataSourceMenu'

		this.setInputs(["Clock"])

		this.config.features = []
		this.config.data = null
	}

	configure (config) {
		this.config = config
		this.updateNode()
	}

	setData (data) {
		// this.config.data = data
		// this.config.features = this.config.data.data[0]
		this.config.features = data.data[0]
		this.config.data = _.tail(data.data)
		this.config.samples = this.config.data.length

		this.setOutputs(['Data (' + this.config.features.length + ' axes)'])
		this.updateNode()
	}

	getAttributes () {
		return this.config.features
	}

	updateNode () {
		this.hint.text("")
		this.headline.text(attributes.title + ' (CSV)')
	}

	_log (args) {
		console.log("Row Output is " + args.data)
	}

	_perform () {
		let input = this.inputs[0].data
		let output = this.outputs[0]
		if (output.edge) {
			output.edge._end.data = this.config.data[input]
			output.edge._end.node.run()
		}
	}

	__perform () {
		// let index = this.inputs[0].data
		let data = _.tail(this.config.data.data)
		let samples = data.length
		// this.sendMessage(0, data[index])
		_.each(data, async row => {
			this.log({data: row})
			let output = this.outputs[0]
			if (output.edge) {
				output.edge._end.data = row
				// Run successor nodes once for each parsed row
				output.edge._end.node.run()
			}
			console.clearLog()
		})
		console.log("Flow execution done.");
	}

}