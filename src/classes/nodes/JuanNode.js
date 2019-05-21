/**************************************
 *	JUANNODE
 *	bla
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Juan Node',
	hint: 'bla',
	description: 'bla'
}

export default class JuanNode extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'JuanNodeMenu'
		this.description = attributes.description

		// this.setInputs(["1"])
		// this.setOutputs(["1"])
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}