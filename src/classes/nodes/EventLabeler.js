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
	}

	setData (data) {
		this.data = data.data
		console.log(this.data)
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		// take incoming data from this.inputs array
		let index = this.inputs[0].data
		
		if (index == -1) return

		let result = _.filter(this.data, o => _.inRange(o.index, index - 10, index + 10));
		console.log("Event at index " + index + " got labeled as " + result[0].label)
		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}