/**************************************
 *	DATA SOURCE
 *	inherits from Node, enabling
 *	data input for the chain
 **************************************/

import Node from './Node.js'

let attributes = {
	backgroundColor: '#57A9FF',
	headerColor: '#4687CC',
	title: 'Data Source',
	hint: 'Click to add Data'
}
 
export default class DataSource extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.data = null
		this.features = []
	}

	setData = function (data) {
		this.data = data
		this.updateNode()
		this.setFeatures(this.data.data[0])
	}

	setFeatures = function (features) {
		this.features = features
		this.setOutputs(features)
		this.perform()
	}

	updateNode = function () {
		this.hint.text("")
		this.headline.text(attributes.title + ' (CSV)')
	}

	perform = function () {
		let cols = []
		for (let i = 0; i < this.features.length; i ++) {
			cols.push(this.data.data[0].findIndex( el => el == this.features[i]))
		}
		for (let j = 0; j < this.data.data.length; j ++) {
			
		}
	}

}