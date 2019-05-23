/**************************************
 *	EVENTLABELER
 *	Matches detected events with labels from an external file.
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Event Labeler',
	hint: 'Matches detected events with labels from an external file.',
	description: 'Matches detected events with labels from an external file.'
}

export default class EventLabeler extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'EventLabelerMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Index"])
		this.setOutputs(["Label"])

		this.config.tolerance = 10
	}

	setData (data) {
		this.config.data = data.data
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		// take incoming data from this.inputs array
		let index = this.inputs[0].data
		
		if (index == -1) return

		let result = _.filter(this.config.data, o => _.inRange(o.index, index - this.config.tolerance, index + this.config.tolerance));
		let label = result.length ? result[0].label : "undefined"
		this.log({index: index, label: label})
		// and send result to the edge._end of this.outputs array
		this.sendMessage(0, label)
	}

	_log (args) {
		console.log("Event at index " + args.index + " got labeled as " + (args.label != "-1" ? args.label : "undefined"))
	}


}