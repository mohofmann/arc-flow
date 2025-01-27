/**************************************
 *	RINGBUFFER
 *	inherits from Node, simulates
 *	memory like a ring buffer
 **************************************/

import _ from 'lodash'
import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#FFB000',
	headerColor: '#BF8400',
	title: 'Ringbuffer',
	hint: 'Click to set Memory Size',
	description: 'Buffers a signal vector and is able to output past signals'
}

export default class Ringbuffer extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.index = 0
		this.range = 0
		this.fields = []
		this.adjustFields()
		this.setInputs(['Data'])
		this.setOutputs(['Data'])
		this.hint.text('')

		this.description = attributes.description
		this.detailMenu = 'RingbufferMenu'

		this.config.fieldAmount = 512
	}

	adjustFields = function () {
		// shrink the amount of fields
		if (this.fields.length > this.config.fieldAmount) {
			this.fields = _.take(this.fields, this.config.fieldAmount)
			if (this.index >= this.config.fieldAmount) {
				this.index = this.config.fieldAmount - 1
			}
		// or add fields
		} else {
			const missingFields = this.config.fieldAmount - this.fields.length
			for (let i = 0; i < missingFields; i ++) {
				this.fields.push([])
			}
		}
	}

	_perform = function () {
		this.store(this.inputs[0].data)
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = this.inputs[0].data
		}
	}

	store = function (newField) {
		this.increaseIndex()
		this.fields[this.index] = newField
	}

	increaseIndex = function () {
		this.index = (this.index + 1) % this.config.fieldAmount
	}

	updateNode = function (fieldSize, fieldAmount) {
		this.config.fieldAmount = fieldAmount
		this.adjustFields()
	}

}