/**************************************
 *	PREPROCESSOR
 *	inherits from Node, enabling
 *	energy calculation
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Preprocessor',
	hint: 'Connect inputs'
}

export default class Preprocessor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)

		this.setInputs(["1", "2", "3"])
		this.setOutputs(["Energy"])
	}

	_perform = function (args) {
		calculateEnergy(args)
	}

}