/**************************************
 *	SVM
 *	Support Vector Machine classifier
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Svm',
	hint: 'Support Vector Machine classifier',
	description: 'Support Vector Machine classifier'
}

export default class Svm extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.detailMenu = 'SvmMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Feature Table", "Labels Table"])
		this.setOutputs(["Classified Table"])

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
		const features = this.inputs[0].data
  	const labels = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,2,0,2,0,2,0,2,2,2,1,3,3,3,3,3,1,1,0,4,0,4,4,0,4,0,4,1,1,0,5,0,5,5,0,5,5,0,5,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,7,7,7,7,7,7,7,7,7,7,1,1,8,0,8,8,0,8,8,8,8,8,8,1,9,0,9,0,9,0,10,10,1,0,11,0,11,0,11,0,1,1,12,12,0,12,0,1,1,0,0,13,0,0,0,0,13,0,0,0,0,13,0,0,0,0,13,0,13,0,1,1,1,14,15,14,15,14,15,14,15,14,15,14,15,14,15,14,14,15,14,1,1,16,0,16,0,16,0,16,0,16,16,16,0,16,0,16,0,1,1,0,0,17,0,17,0,17,17,0,17,0,17,0,17,0,17,0,17,17,1,1,1,1,0,0,18,0,18,18,0,18,1,1,1,19,19,19,19,19,1,1,1,20,20,1,1,1,0,21,21,21,21,0,0,0,0,0,0,0,1,1,1,0,0,0,1,22,22,22,22,22,22,22,1,1,1,1,1,1]
  	this.model.train(features, labels)  // train the model
  	// const predictedLabel = this.model.predictOne([0.008178707,-0.00683805018415842]);
  	// const predictedLabel = this.model.predictOne([0.7, 0.8])
  	// console.log("predicted label is " + predictedLabel)
		// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}