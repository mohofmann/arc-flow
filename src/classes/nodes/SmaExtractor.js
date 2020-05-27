/**************************************
 *	SMAEXTRACTOR
 *	Extracts SMA Feature
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Sma Extractor',
	hint: 'Extracts SMA Feature'
}

export default class SmaExtractor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["1"])
		this.setOutputs(["1"])

		this.detailMenu = 'SmaExtractorMenu'
	}

	_perform () {
		// take incoming data from this.inputs array
		let data = this.inputs[0].data[0]
		let sum = 0
		// process it
		_.each(data, (value) => {
			sum += Math.abs(value)
		})
		// and send result to the edge._end of this.outputs array
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = sum
		}
		this.log({sum: sum})
	}

	_log (args) {
		console.log("SMA is " + args.sum)
	}


}