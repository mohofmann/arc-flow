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

export default class Memory extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.fieldAmount = 512
		this.index = 0
		this.range = 0
		this.fields = []
		this.adjustFields()
		this.setInputs(['Data'])
		this.setOutputs(['Data'])
		this.hint.text('')

		this.description = attributes.description
		this.detailMenu = 'RingbufferMenu'
	}

	adjustFields = function () {
		// shrink the amount of fields
		if (this.fields.length > this.fieldAmount) {
			this.fields = _.take(this.fields, this.fieldAmount)
			if (this.index >= this.fieldAmount) {
				this.index = this.fieldAmount - 1
			}
		// or add fields
		} else {
			const missingFields = this.fieldAmount - this.fields.length
			for (let i = 0; i < missingFields; i ++) {
				this.fields.push([])
			}
		}
	}

	_perform = function () {
		this.store(this.inputs[0].data)
		if (this.outputs[index].edge) {
			this.outputs[index].edge._end.data = this.inputs[0].data
		}
	}

	store = function (newField) {
		this.increaseIndex()
		this.fields[this.index] = newField
	}

	increaseIndex = function () {
		this.index = (this.index + 1) % this.fieldAmount
	}

	updateNode = function (fieldSize, fieldAmount) {
		this.fieldAmount = fieldAmount
		this.adjustFields()
	}

}