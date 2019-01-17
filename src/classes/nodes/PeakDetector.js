/**************************************
 *	PEAK DETECTOR
 *	inherits from Node, enabling
 *	energy calculation
 **************************************/

import Node from '../Node.js'
 
const attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Peak Detector',
	hint: ''
}

const defaultInputs = [
	'1'
]

const defaultOutputs = [
	'Peak'
]

export default class PeakDetector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.minPeakHeight = 0
		this.minPeakDistance = 0

		this._samplesSinceLastPeak = 0
		this._lastPeakValue = 0
		this._counter = 0

		defaultInputs && this.setInputs(defaultInputs)
    defaultOutputs && this.setOutputs(defaultOutputs)
	}

	_perform = function () {
		this._samplesSinceLastPeak ++
		this._counter ++
		console.log("works")
		let energy = this.inputs[0].data
 
		// check whether a previously marked peak candidate was really a peak
		if (this._lastPeakValue > 0 && this._samplesSinceLastPeak >= this.minPeakDistance) {
		  console.log("Peak found: " + this._lastPeakValue + " at position " + this._counter)
		  this._lastPeakValue = 0
		}
 
		// Mark new peak candidates
		if (energy > this.minPeakHeight) {
			if (energy > this._lastPeakValue || this._samplesSinceLastPeak >= this.minPeakDistance) {
				this._lastPeakValue = energy
				this._samplesSinceLastPeak = 0
			}
		}
	}

}