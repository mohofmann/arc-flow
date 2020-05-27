/**************************************
 *	MAX
 *	Maximum value of the signal
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Max',
	hint: 'Maximum value of the signal',
	description: 'Maximum value of the signal'
}

export default class Max extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'MaxMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Segment"])
		this.setOutputs(["Maximum"])
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		// take incoming data from this.inputs array
		let result = parseFloat(_.max(this.inputs[0].data[0]))
		// prevent the 0 edge case
		if (result == 0) result = 0.00000001
		this.sendMessage(0, result)
		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}