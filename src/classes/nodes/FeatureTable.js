/**************************************
 *	FEATURETABLE
 *	Generates a table from feature vectors
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Feature Table',
	hint: 'Generates a table from feature vectors',
	description: 'Generates a table from feature vectors'
}

export default class FeatureTable extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'FeatureTableMenu'
		this.description = attributes.description
		this.hint.text("")

		this.table = []
		this.counter = 0
		this.setInputs(["Vector"])
		this.setOutputs(["Table"])
		this.config.tableSize = 100 //267
	}

	configure (config) {
		this.config = config
	}

	_preperform () {
		// potential functionality to be executed once before execution
		this.counter = 0
	}

	_perform () {
		// take incoming data from this.inputs array
		this.table.push(this.inputs[0].data)
		this.counter ++
		console.log(this.counter)
		if (this.counter < this.config.tableSize) return
		this.counter = 0
		this.sendMessage(0, this.table)
		this.table = []
	}

	_log (args) {
		
	}


}