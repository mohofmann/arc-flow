/**************************************
 *	MEDIANEXTRACTOR
 *	Extracts Median Feature
 **************************************/

import Node from '../Node.js'
import JStat from 'jStat'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Median Extractor',
	hint: ''
}

export default class MedianExtractor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["Segment"])
		this.setOutputs(["Median"])

		this.detailMenu = 'MedianExtractorMenu'
	}

	_perform () {
		// take incoming data from this.inputs array
		let data = this.inputs[0].data
		// process it
		let median = JStat.median(data)
		// and send result to the edge._end of this.outputs array
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = median
		}
		this.log({median: median})
	}

	_log (args) {
		console.log("Median is " + args.median)
	}


}