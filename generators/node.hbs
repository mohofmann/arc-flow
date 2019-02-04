/**************************************
 *	SEGMENTOR
 *	inherits from Node, takes a range
 *	and segments it in subranges
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Feature Extractor',
	hint: ''
}

export default class FeatureExtractor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.feature = ''
		this.setInputs(["Range"])
		this.setOutputs(["Feature"])
	}

	_perform () {
		console.log("performing")
		let range = this.inputs[0].data
		let mean = 0

		_.each(range, value => {
			mean += value * (1/range.length)
		})

		this.log({mean: mean})

		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = mean
		}
	}

	_log (args) {
		console.log("Mean is " + args.mean)
	}

	updateFeature (selectedFeature) {
		if (selectedFeature != this.feature) {
			this.feature = selectedFeature
  		this.headline.text(attributes.title + " (" + this.feature + ")")
		}
	}


}