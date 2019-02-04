/**************************************
 *	ZRC
 *	Extracts ZRC
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Zrc',
	hint: 'Extracts ZRC'
}

export default class Zrc extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		// this.setInputs(["1"])
		// this.setOutputs(["1"])
	}

	_perform () {
		// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}