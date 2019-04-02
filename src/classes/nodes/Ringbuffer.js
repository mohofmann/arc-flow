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
		this.fieldSize = 0
		this.index = 0
		this.range = 0
		this.fields = []
		this.adjustFields()

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
		let newField = []
		_.each(this.inputs, (input, index) => {
			newField.push(input.data)
			if (this.outputs[index].edge) {
				this.outputs[index].edge._end.data = input.data
			}
		})
		this.store(newField)
	}

	setFieldSize = function (fieldSize) {
		if (fieldSize == 0) {
			this.setInputs([])
			this.hint.text(attributes.hint)
		} else {
			this.fieldSize = fieldSize
			let fields = []
			for (let i = 1; i <= fieldSize; i ++) {
				fields.push(i.toString())
			}
			this.setInputs(fields)
			this.setOutputs(fields)
			this.hint.text("")
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
		if (this.fieldSize != fieldSize) {
			this.setFieldSize(fieldSize)
		}
	}

}