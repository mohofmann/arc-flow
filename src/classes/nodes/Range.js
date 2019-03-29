/**************************************
 *	RANGE
 *	inherits from Node, stores a stream
 *	of data in a ring buffer and
 *	outputs it as a range of signals
 **************************************/

import _ from 'lodash'
import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#FFB000',
	headerColor: '#BF8400',
	title: 'Range',
	hint: '',
	description: 'Buffers a configurable amount of signals and outputs a range of signals'
}

const defaultInputs = [
	'Input',
	'Index'
]

const defaultOutputs = [
	'Range'
]

export default class Range extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.queueSize = 1
		this.rangeBeforeIndex = 0
		this.rangeAfterIndex = 0
		this.queue = []
		this.latestPeakIndex = -1
		this.queueEndIndex = 0

		this.updateQueueSize()

		this.setInputs(defaultInputs)
		this.setOutputs(defaultOutputs)

		this.detailMenu = 'RangeMenu'
	}

	_preperform () {
		this.queue = []
		this.updateQueueSize()
		this.latestPeakIndex = -1
		this.queueEndIndex = 0
	}

	_log (args) {
		console.log(args.text)
	}

	_perform () {
		this.store(this.inputs[0].data)

		let index = this.inputs[1].data
		// If a peak index gets provided..
		if (index != -1) {
			// ..buffer it for later..
			this.latestPeakIndex = index
		}
		// .. and try to find its proper range
		if (this.latestPeakIndex != -1) {
			// calculate possible index range
			let minIndex = this.queueEndIndex - this.queueSize + this.rangeBeforeIndex
			let maxIndex = this.queueEndIndex - this.rangeAfterIndex
			// check if given peak and range are contained in queue
			let relativeIndex = this.queueSize - (this.queueEndIndex - this.latestPeakIndex) - 1
			// let relativeIndex = this.queueEndIndex - this.latestPeakIndex - 1
			if (this.latestPeakIndex >= minIndex && this.latestPeakIndex <= maxIndex) {
				let range = this.queue.slice(relativeIndex - this.rangeBeforeIndex, relativeIndex + this.rangeAfterIndex + 1)
				if (this.outputs[0].edge) {
					this.outputs[0].edge._end.data = range
				}
				this.latestPeakIndex = -1
			}
			else if (this.latestPeakIndex < minIndex) {
				this.log({text: "Queue contains index, but not the whole range before, Consider increasing the queue size"})
				this.latestPeakIndex = -1
			}
			else if (this.latestPeakIndex > maxIndex) {
				this.log({text: "Queue contains index, but not the whole range after"})
				console.log("----------------")
			}
			else {
				this.log({text: "Queue does not contain the index"})
				this.latestPeakIndex = -1
			}
		}
	}

	store = function (newValue) {
		this.queue.push(newValue)
		this.queue.shift()
		this.queueEndIndex += 1
	}

	updateQueueSize () {
		this.queue = []
		for (let i = 0; i < this.queueSize; i ++) {
			this.queue.push(null)
		}
	}

	updateNode = function (rangeBeforeIndex, rangeAfterIndex, queueSize) {
		this.rangeBeforeIndex = parseInt(rangeBeforeIndex)
		this.rangeAfterIndex = parseInt(rangeAfterIndex)
		this.queueSize = parseInt(queueSize)
		this.updateQueueSize()
	}

}