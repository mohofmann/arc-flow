/**************************************
 *	FEATUREVECTOR
 *	Aggregates Features to a Vector
 **************************************/

import Node from '../Node.js'
import Jstat from 'jStat'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Feature Vector',
	hint: 'Aggregates Features',
	// TODO: Make Node Generator support Description (beware of the ,)
	description: 'Takes multiple feature values and outputs them as a vector'
}

export default class FeatureVector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["Feature 1"])
		this.setOutputs(["Vector"])
		this.hint.text("")
		this.description = attributes.description
		this.detailMenu = 'FeatureVectorMenu'

		this.config.featureAmount = 1
	}

	_perform () {
		// take incoming data from this.inputs array
		let vector = []
		_.each(this.inputs, input => {
			// if (input.edge) {
				vector.push(input.data)
			// }
		})
		// process it
		// and send result to the edge._end of this.outputs array
		this.sendMessage(0, vector)
	}

	_log (args) {
		console.log("minimum is " + args.min)
	}

	// TODO: create a addInputs function to add new Inputs without destroying old ones
	updateFeatureAmount (amount) {
		if (this.config.featureAmount == amount) return
		this.config.featureAmount = amount
		let oldInputs = this.inputs
		let newInputs = []
		for (let i = 0; i < amount; i ++) {
			newInputs.push("Feature " + (i+1))
		} 
		this.setInputs(newInputs)
	}


}