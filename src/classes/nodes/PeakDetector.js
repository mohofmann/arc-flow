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
	'Peak Signal'
]

const defaultOutputs = [
	'Peak Signal',
	'Peak Index'
]

export default class PeakDetector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.minPeakHeight = 0
		this.minPeakDistance = 0

		defaultInputs && this.setInputs(defaultInputs)
    defaultOutputs && this.setOutputs(defaultOutputs)

    this.detailMenu = 'PeakDetectorMenu'
	}

	_preperform () {
		this._samplesSinceLastPeak = 0
		this._lastPeakValue = 0
		this._counter = 0
	}

	_log () {
		console.log("----")
	  console.log("Peak found: " + this._lastPeakValue)
	  console.log("at position " + (this._counter - this._samplesSinceLastPeak))
	  console.log("----")
	}

	_perform = function () {
		this._samplesSinceLastPeak ++
		this._counter ++
		let energy = this.inputs[0].data
		if (this.outputs[0].edge) this.outputs[0].edge._end.data = energy
 
		// check whether a previously marked peak candidate was really a peak
		if (this._lastPeakValue > 0 && this._samplesSinceLastPeak >= this.minPeakDistance) {
			// TODO: Handle the peak
			this.log()
			if (this.outputs[1].edge) this.outputs[1].edge._end.data = this._counter - this._samplesSinceLastPeak
		  this._lastPeakValue = 0
		}
		else {
			if (this.outputs[1].edge) this.outputs[1].edge._end.data = -1
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