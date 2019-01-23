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
	hint: 'Click to set Range',
	description: 'Buffers a configurable amount of signals and outputs a range of signals'
}

export default class Range extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.fieldAmount = 512
		this.fieldSize = 0
		this.index = 0
		this.range = 0
		this.fields = []
		this.adjustFields()
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

	setRange (range) {
		this.range = range
		let rangeLabel = range > 0 ? " (Range: " + this.range + ")" : ""
		_.each(this.outputs, (output, index) => {
			output.element.get(0).text((index + 1) + rangeLabel)
		})
	}

	setFieldSize = function (fieldSize) {
		if (fieldSize == 0) {
			this.setInputs([])
			this.hint.text(attributes.hint)
		} else {
			this.fieldSize = fieldSize
			let inputs = []
			let outputs = []
			for (let i = 1; i <= fieldSize; i ++) {
				inputs.push(i.toString())
				outputs.push(i.toString())
			}
			this.setInputs(inputs)
			this.setOutputs(outputs)
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

	updateNode = function (fieldSize, fieldAmount, range) {
		this.fieldAmount = fieldAmount
		this.adjustFields()
		if (this.fieldSize != fieldSize) {
			this.setFieldSize(fieldSize)
		}
		this.setRange(range)
	}

}