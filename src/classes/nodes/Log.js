/**************************************
 *	LOG
 *	Logs the incoming signal to the console
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Log',
	hint: '',
	description: 'Logs incoming data and passes it through to the output'
}

export default class Log extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'LogMenu'
		this.description = attributes.description

		this.setInputs(["Data"])
		this.setOutputs(["Data"])

		this.maxLog = 100
		this.logCount = 0
	}

	_preperform () {
		this.logCount = 0
	}

	_perform () {
		// take incoming data from this.inputs array
		// process it
		let data = this.inputs[0].data
		this.sendMessage(0, data)

		if (data == "-1" || this.logCount >= this.maxLog) return
		
		console.log(this.inputs[0].edge._start.node.headline.text().toUpperCase() + ":", data)
		this.logCount ++
	}

	_log (args) {
		
	}


}