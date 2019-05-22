/**************************************
 *	PREPROCESSOR
 *	inherits from Node, enabling
 *	energy calculation
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Squared Magnitude',
	hint: '',
	description: 'Calculates the squared Magnitude of input attributes'
}

export default class SqrMagnitude extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.type = ""
		this.setInputs(["Data"])
		this.setOutputs(['Sqd. Magnitude'])
		this.description = attributes.description

		this.detailMenu = 'SqrMagnitudeMenu'
	}

	_perform = function (args) {
		let energy = 0
		_.each(this.inputs[0].data, attribute => {
			energy += (attribute * attribute)
			this.log({energy: energy})
		})
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = energy
		}
	}

	_log = function (args) {
		console.log("sq. magnitude is " + args.energy + "\n")
	}

}