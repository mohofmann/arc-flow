/**************************************
 *	START
 *	Initial node of the flow
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Start',
	hint: 'Initial node of the flow',
	description: 'Initial node of the flow'
}

export default class Start extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'StartMenu'
		this.description = attributes.description
		this.hint.text("")

		this.config.count = 100

		// this.setInputs(["1"])
		this.setOutputs(["Clock"])
	}

	configure (config) {
		// potential setup work to be executed on node recreation (e.g. through loading a project)
		this.config = config
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_runSuccessors () {

	}

	_perform () {
		// take incoming data from this.inputs array
		// _.times(this.config.count, async i => {
		// 	let output = this.outputs[0]
		// 	if (output.edge) {
		// 		this.sendMessage(0, i)
		// 		output.edge._end.node.run()
		// 	}
		// })
		let output = this.outputs[0]
		if (output.edge) {
			this.sendMessage(0, 1)
			output.edge._end.node.run()
		}
		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}