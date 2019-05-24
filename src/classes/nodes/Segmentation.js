/**************************************
 *	SEGMENTATION
 *	inherits from Node, stores a stream
 *	of data in a ring buffer and
 *	outputs it as a range of signals
 **************************************/

import _ from 'lodash'
import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#FFB000',
	headerColor: '#BF8400',
	title: 'Segmentation',
	hint: '',
	description: 'Buffers a configurable amount of signals and outputs a range of signals'
}

const defaultInputs = [
	'Input',
	'Index'
]

const defaultOutputs = [
	'Segment'
]

export default class Segmentation extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.queue = []
		this.latestPeakIndex = -1
		this.queueEndIndex = 0
		this.setInputs(defaultInputs)
		this.setOutputs(defaultOutputs)
		this.detailMenu = 'SegmentationMenu'

		this.config.queueSize = 1
		this.config.rangeBeforeIndex = 0
		this.config.rangeAfterIndex = 0
	}

	_preperform () {
		this.queue = []
		// this.updateQueueSize()
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
			let minIndex = this.queueEndIndex - this.config.queueSize + this.config.rangeBeforeIndex
			let maxIndex = this.queueEndIndex - this.config.rangeAfterIndex
			// check if given peak and range are contained in queue
			let relativeIndex = this.config.queueSize - (this.queueEndIndex - this.latestPeakIndex) - 1
			// let relativeIndex = this.queueEndIndex - this.latestPeakIndex - 1
			if (this.latestPeakIndex >= minIndex && this.latestPeakIndex <= maxIndex) {
				// let range = this.queue.slice(relativeIndex - this.rangeBeforeIndex, relativeIndex + this.rangeAfterIndex + 1)
				let range = this.queue.slice(0)
				for (let i = 0; i < range.length; i ++) {
					range[i] = range[i].slice(relativeIndex - this.config.rangeBeforeIndex, relativeIndex + this.config.rangeAfterIndex + 1)
				}

				// _.each(range, attribute => {
				// 	attribute = attribute.slice(relativeIndex - this.rangeBeforeIndex, relativeIndex + this.rangeAfterIndex + 1)
				// })
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
		if (this.queue.length == 0) {
			this.initializeQueue(newValue)
		}

		_.each(newValue, (value, index) => {
			this.queue[index].push(value)
			this.queue[index].shift()
		})

		// this.queue.push(newValue)
		// this.queue.shift()
		this.queueEndIndex += 1
	}

	// Initialize an empty field of #attributes subfields
	// and subfields having queueSize 
	initializeQueue (sample) {
		_.each(sample, attribute => {
			let values = []
			for (let i = 0; i < this.config.queueSize; i ++) {
				values.push(null)
			}
			this.queue.push(values)
		})
	}

	updateNode = function (rangeBeforeIndex, rangeAfterIndex, queueSize) {
		this.config.rangeBeforeIndex = parseInt(rangeBeforeIndex)
		this.config.rangeAfterIndex = parseInt(rangeAfterIndex)
		this.config.queueSize = parseInt(queueSize)
	}

}