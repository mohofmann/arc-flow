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
		this.counter = 0

		this.updateQueueSize()

		this.setInputs(defaultInputs)
		this.setOutputs(defaultOutputs)
	}

	_perform = function () {
		this.store(this.inputs[0].data)

		let index = this.inputs[1].data
		// If a peak index gets provided..
		if (index != -1) {
			// ..buffer it for later..
			this.latestPeakIndex = index
		}
		// .. and try to find its proper range
		if (this.latestPeakIndex != -1) {
			//
		}
	}

	store = function (newValue) {
		this.queue.push(newValue)
		this.queue.shift()
		this.counter += 1
	}

	updateQueueSize () {
		this.queueSize = parseInt(this.rangeBeforeIndex) + parseInt(this.rangeAfterIndex) + 1
		this.queue = []
		for (let i = 0; i < this.queueSize; i ++) {
			this.queue.push(null)
		}
	}

	updateNode = function (rangeBeforeIndex, rangeAfterIndex) {
		// this.fieldAmount = fieldAmount
		this.rangeBeforeIndex = rangeBeforeIndex
		this.rangeAfterIndex = rangeAfterIndex
		// Set field amount to total range incl. index
		this.updateQueueSize()
	}

}