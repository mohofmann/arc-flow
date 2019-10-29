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

		this.setInputs(["Feature Tbl", "Label Tbl"])
		this.setOutputs(["Classif. Table"])

		this.svm = null
		this.model = null

		// let features = [1,2,3,4,5,6,7,8,9,10,11,12]
		// let labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
		// console.log(this._getTrainingData(features, labels, 3))
	}

	_preperform () {
		// potential functionality to be executed once before execution
	}

	_getTrainingData(arr1, arr2, n) {
		if (arr1.length != arr2.length) {
			throw new Error("amount of features and labels are not the same")
			return
		}
    let result1 = new Array(n)
    let result2 = new Array(n)
    let len = arr1.length
    let taken = new Array(len)
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result1[n] = arr1[x in taken ? taken[x] : x];
        result2[n] = arr2[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return {result1: result1, result2: result2}
	}

	_getDifference(arr1, arr2) {
		return arr1.filter(i => {return arr2.indexOf(i) < 0;})
	}

	_perform () {
		const SVM = require('libsvm-js/asm');
		this.model = new SVM({
    	kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    	type: SVM.SVM_TYPES.C_SVC,    // The type of SVM I want to run
    	gamma: 1,                     // RBF kernel gamma parameter
    	cost: 1                       // C_SVC cost parameter
  	});
		const features = this.inputs[0].data // all features
  	const labels = this.inputs[1].data // all labels

  	let strippedFeatures = []
  	let strippedLabels = []

  	_.each(labels, (label, i) => {
  		if (label != -1) {
  			strippedFeatures.push(features[i])
  			strippedLabels.push(labels[i])
  		}
  	})

    let mlFeatures = strippedFeatures
    let mlLabels = strippedLabels

  	let cv = this.model.crossValidation(mlFeatures, mlLabels, 10)
  	console.log("LABELS ------------")
  	console.log(mlLabels)
  	console.log("PREDICTION ---------")
  	console.log(cv)

  	console.log("ACCURACY ----------")
  	let matches = 0
  	let total = cv.length
  	_.each(cv, (e, i) => {
  		if (cv[i] == mlLabels[i]) matches ++
  	})
  	console.log("Matches: " + matches)
  	console.log("Accuracy: " + (matches / total) + " %")



  	//// LEGACY

  	// let trainingData = this._getTrainingData(features, labels, 200)
  	// const trainingFeatures = trainingData.result1
  	// const trainingLabels = trainingData.result2
  	// const testingFeatures = this._getDifference(features, trainingFeatures)
  	// console.log("trainingFeatures", trainingFeatures)
  	// console.log("trainingLabels", trainingLabels)
  	// console.log("testingFeatures", testingFeatures)

  	//this.model.train(features, labels)  // train the model

  	//// const predictedLabel = this.model.predictOne([-0.006561279,0.2139892,-0.05759874281188121,-0.0009155273,0.9999692,-0.013722334151485154,-0.001831055,0.3905944,0.03504202635643565]);
  	
  	//const predictedLabel = this.model.predict(this.inputs[2].data)
  	//// const predictedLabel = this.model.predictOne([0.7, 0.8])
  	
  	//console.log("predicted label is " + predictedLabel)
		//// take incoming data from this.inputs array

		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}