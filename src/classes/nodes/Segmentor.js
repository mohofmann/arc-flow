/**************************************
 *	SEGMENTOR
 *	inherits from Node, takes a range
 *	and segments it in subranges
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Segmentor',
	hint: ''
}

export default class Segmentor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.segmentAmount = 1
		this.segments = [{start: 0}]
		this.setInputs(["Range"])
		this.setOutputs(["Segment 1"])
	}

	_perform () {
		console.log("performing")
		let range = this.inputs[0].data
		console.log("range is " + range)

		_.each(this.segments, (segment, index) => {
			let newRange = []
			let nextSegment = this.segments[index + 1]
			if (nextSegment) {
				newRange = range.slice(segment.start, nextSegment.start)
			}
			else {
				newRange = range.slice(segment.start)
			}
			console.log(newRange)
			if (this.outputs[index].edge) {
				this.outputs[index].edge._end.data = newRange
			}
		})
	}

	updateSegmentAmount (amount) {
		let outputs = []
		_.times(amount, i => {
			outputs.push("Segment " + (i+1))
		})
		this.setOutputs(outputs)
		this.segmentAmount = amount
	}


}