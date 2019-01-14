/**************************************
 *	MEMORY
 *	inherits from Node, simulates
 *	memory like a ring buffer
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#FFB000',
	headerColor: '#BF8400',
	title: 'Memory',
	hint: 'Click to set Memory Size'
}

export default class Memory extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
	}

	perform = function (args) {
		// calculateEnergy(args)
	}

	setFieldSize = function (fieldSize) {
		if (fieldSize == 0) {
			this.setInputs([])
			this.hint.text(attributes.hint)
		} else {
			this.fieldSize = fieldSize
			let fields = []
			for (let i = 1; i <= fieldSize; i ++) {
				fields.push(i.toString())
			}
			this.setInputs(fields)
			this.hint.text("")
		}	
	}

	updateNode = function (fieldSize, fieldAmount) {
		this.fieldAmount = fieldAmount
		if (this.fieldSize != fieldSize) {
			this.setFieldSize(fieldSize)
		}
	}

}