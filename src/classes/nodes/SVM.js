/**************************************
 *	SVM
 *	Support Vector Machine classifier
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'SVM',
	hint: 'Support Vector Machine classifier',
	description: 'Support Vector Machine classifier'
}

export default class Svm extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'SVMMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Training Fts.", "Training Lbls.", "Testing Fts."])
		this.setOutputs(["Classif. Table"])

		this.svm = null
		this.model = null
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_perform () {
		const SVM = require('libsvm-js/asm');
		this.model = new SVM({
    	kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    	type: SVM.SVM_TYPES.C_SVC,    // The type of SVM I want to run
    	gamma: 1,                     // RBF kernel gamma parameter
    	cost: 1                       // C_SVC cost parameter
  	});
		const featureTable = this.inputs[0].data
  	const labels = this.inputs[1].data
  	this.model.train(featureTable, labels)  // train the model
  	// const predictedLabel = this.model.predictOne([-0.006561279,0.2139892,-0.05759874281188121,-0.0009155273,0.9999692,-0.013722334151485154,-0.001831055,0.3905944,0.03504202635643565]);
  	const predictedLabel = this.model.predict(this.inputs[2].data)
  	// const predictedLabel = this.model.predictOne([0.7, 0.8])
  	console.log("predicted label is " + predictedLabel)
		// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}