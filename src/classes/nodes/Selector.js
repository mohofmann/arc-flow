/**************************************
 *	SELECTOR
 *	Selects one or more attributes from a sample
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#57A9FF',
	headerColor: '#4687CC',
	title: 'Selector',
	hint: 'Selects sample attributes',
	description: 'Selects one or more attributes of a sample and outputs a subsample'
}

export default class Selector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.detailMenu = 'SelectorMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Data"])
		this.setOutputs([""])
	}

	_perform () {
		// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}