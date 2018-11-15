/**************************************
 *	DATA SOURCE
 *	inherits from Node, enabling
 *	data input for the chain
 **************************************/

import Node from './Node.js'
 
let attributes = {
	backgroundColor: '#F06',
	headerColor: '#CF0053',
	title: 'Preprocessor',
	hint: 'Connect inputs to Data Source'
}

export default class Preprocessor extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
	}

}