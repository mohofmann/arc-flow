/**************************************
 *	LOG
 *	Logs the incoming signal to the console
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Log',
	hint: 'Logs input signal',
	description: 'Logs incoming data and passes it through to the output'
}

export default class Log extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'LogMenu'
		this.description = attributes.description

		this.setInputs(["Data"])
		this.setOutputs(["Data"])
	}

	_preperform () {
		
	}

	_perform () {
		// take incoming data from this.inputs array
		// process it
		if (this.inputs[0].data != "-1") {
			console.log(this.inputs[0].edge._start.node.headline.text() + ": " + this.inputs[0].data)
		}
		// and send result to the edge._end of this.
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = this.inputs[0].data
		}
	}

	_log (args) {
		
	}


}