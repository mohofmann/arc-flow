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
		let data = this.inputs[0].data
		this.sendMessage(0, data)

		if (data == "-1") return
		
		console.log(this.inputs[0].edge._start.node.headline.text().toUpperCase() + ":", data)
	}

	_log (args) {
		
	}


}