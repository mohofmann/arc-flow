/**************************************
 *	MAGNITUDE
 *	Calculates Magnitude
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Magnitude',
	hint: 'Calculates Magnitude',
	description: 'Calculates the magnitude of input attributes'
}

export default class Magnitude extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["Data"])
		this.setOutputs(['Sqd. Magnitude'])

		this.detailMenu = 'MagnitudeMenu'
		this.description = attributes.description
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		let energy = 0
		_.each(this.inputs[0].data, attribute => {
			energy += (attribute * attribute)
		})
		energy = Math.sqrt(energy)
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = energy
		}
	}

	_log (args) {
		
	}


}