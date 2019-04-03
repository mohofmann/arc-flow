/**************************************
 *	SELECTOR
 *	Selects one or more attributes from a sample
 **************************************/

import Node from '../Node.js'
 
let attributes = {
	backgroundColor: '#57A9FF',
	headerColor: '#4687CC',
	title: 'Selector',
	hint: 'Selects sample attributes',
	description: 'Selects one or more attributes of a sample and outputs a subsample'
}

export default class Selector extends Node {

	constructor (canvas, watchCanvas) {
		super (canvas, attributes, watchCanvas)
		this.detailMenu = 'SelectorMenu'
		this.description = attributes.description
		this.hint.text("")

		this.setInputs(["Data"])
		this.setOutputs([""])
		this.attributes = []
		this.selectedAttributes = []
	}

	setAttributes (attributes, selectedAttributes) {
		this.attributes = []
		this.selectedAttributes = selectedAttributes

		_.each(attributes, (attribute, index) => {
			_.each(selectedAttributes, selectedAttribute => {
				if (attribute == selectedAttribute) {
					this.attributes.push({attribute: attribute, index: index})
				}
			})
		})

		this.setOutputs([selectedAttributes.toString()])
		console.log(this.attributes)
	}

	_perform () {
		// take incoming data from this.inputs array
		let output = []
		_.each(this.attributes, attribute => {
			output.push(this.inputs[0].data[attribute.index])
		})
		console.log(output)
		// process it

		// and send result to the edge._end of this.outputs array
	}

	_log (args) {
		
	}


}