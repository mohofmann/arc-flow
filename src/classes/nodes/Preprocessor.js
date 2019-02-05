/**************************************
 *	PREPROCESSOR
 *	inherits from Node, enabling
 *	energy calculation
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Preprocessing',
	hint: ''
}

export default class Preprocessor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.type = ""
		this.setInputs(["1", "2", "3"])
		this.setType("MAGNITUDE")
	}

	_perform = function (args) {
		let energy = 0
		_.each(this.inputs, input => {
			energy += (input.data * input.data)
			this.log({energy: energy})
		})
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = energy
		}
	}

	_log = function (args) {
		console.log("magnitude is " + args.energy + "\n")
	}

	setType = function (type) {
		this.type = type
		this.type && this.headline.text(attributes.title + ' (' + this.type + ')')
		this.hint.text("")
		this.setOutputs([this.type])
	}

}