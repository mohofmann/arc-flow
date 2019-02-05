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
	hint: 'Aggregates tor'
}

export default class FeatureVector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["1"])
		this.setOutputs(["1"])
	}

	_perform () {
		// take incoming data from this.inputs array
		let segment = this.inputs[0].data
		// process it
		let min = Jstat.min(segment)
		// and send result to the edge._end of this.outputs array
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = min
		}
		this.log({min: min})
	}

	_log (args) {
		console.log("minimum is " + args.min)
	}


}