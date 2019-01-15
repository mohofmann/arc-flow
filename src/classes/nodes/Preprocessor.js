/**************************************
 *	PREPROCESSOR
 *	inherits from Node, enabling
 *	energy calculation
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Preprocessor',
	hint: 'Select Calculation'
}

export default class Preprocessor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.type = ""
		this.setInputs(["1", "2", "3"])
	}

	_perform = function (args) {
		let energy = 1
		_.each(this.inputs, input => {
			energy *= input.data
		})
		this.outputs[0].data = energy
		console.log(energy)
	}

	setType = function (type) {
		this.type = type
		this.type && this.headline.text(attributes.title + ' (' + this.type + ')')
		this.setOutputs([this.type])
	}

}