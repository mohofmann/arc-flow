/**************************************
 *	MEMORY
 *	inherits from Node, simulates
 *	memory like a ring buffer
 **************************************/

import Node from './Node.js'
 
let attributes = {
	backgroundColor: '#FFB000',
	headerColor: '#BF8400',
	title: 'Memory',
	hint: 'Connect inputs to Data Source'
}

export default class Memory extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
	}

	perform = function (args) {
		// calculateEnergy(args)
	}

}