/**************************************
 *	KNN
 *	K-Nearest Neighbor Classifier
 **************************************/

import Node from '../Node.js'
import KNN from 'ml-knn'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'KNN',
	hint: 'K-Nearest Neighbor Classifier',
	description: 'K-Nearest Neighbor Classifier'
}

export default class Knn extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'KNNMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Feature Table", "Labels Table"])
		this.setOutputs(["Classified Table"])
	}

	configure (config) {
		// potential setup work to be executed on node recreation (e.g. through loading a project)
		this.config = config
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		const featureTable = this.inputs[0].data
  	const labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,2,0,2,0,2,0,2,2,2,1,3,3,3,3,3,1,1,0,4,0,4,4,0,4,0,4,1,1,0,5,0,5,5,0,5,5,0,5,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,7,7,7,7,7,7,7,7,7,7,1,1,8,0,8,8,0,8,8,8,8,8,8,1,9,0,9,0,9,0,10,10,1,0,11,0,11,0,11,0,1,1,12,12,0,12,0,1,1,0,0,13,0,0,0,0,13,0,0,0,0,13,0,0,0,0,13,0,13,0,1,1,1,14,15,14,15,14,15,14,15,14,15,14,15,14,15,14,14,15,14,1,1,16,0,16,0,16,0,16,0,16,16,16,0,16,0,16,0,1,1,0,0,17,0,17,0,17,17,0,17,0,17,0,17,0,17,0,17,17,1,1,1,1,0,0,18,0,18,18,0,18,1,1,1,19,19,19,19,19,1,1,1,20,20,1,1,1,0,21,21,21,21,0,0,0,0,0,0,0,1,1,1,0,0,0,1,22,22,22,22,22,22,22,1,1,1,1,1,1]
  	let knn = new KNN(featureTable, labels, {k: 23})
  	let dataset = [[-0.006561279,0.2139892,-0.05759874281188121,-0.0009155273,0.9999692,-0.013722334151485154,-0.001831055,0.3905944,0.03504202635643565],[-0.005859375,0.9999692,-0.030568937970297038,-0.6723936,0.8485106,0.24816102930693076,-0.00189209,0.999542,0.037657170446534674], [-0.00302124,0.9999692,0.0013424704455445313,-0.01620483,0.7039793,0.27712643616831695,-0.002349854,0.999542,0.09441834159405939]]
  	let result = knn.predict(dataset);
  	console.log(result)
	}

	_log (args) {
		
	}


}