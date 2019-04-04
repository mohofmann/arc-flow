/**************************************
 *	SPLITTER
 *	Splits input signals
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Splitter',
	hint: 'Splits input signals',
	description: 'Splits input signals'
}

export default class Splitter extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'SplitterMenu'
		this.description = attributes.description

		this.setInputs(["Data"])
		this.setOutputs(["Data", "Data"])
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		_.each(this.outputs, output => {
			if (output.edge) {
				output.edge._end.data = this.inputs[0].data
			}
		})
	}

	_log (args) {
		
	}


}