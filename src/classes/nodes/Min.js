/**************************************
 *	MIN
 *	Minimum value of the signal
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Min',
	hint: 'Minimum value of the signal',
	description: 'Minimum value of the signal'
}

export default class Min extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'MinMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Segment"])
		this.setOutputs(["Minimum"])
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		// take incoming data from this.inputs array
		this.sendMessage(0, _.min(this.inputs[0].data))
		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}