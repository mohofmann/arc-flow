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

		this.config.attributes = []
		this.config.selectedAttributes = []
	}

	configure (config) {
		this.config = config
		this.outputs[0].setLabel(this.config.selectedAttributes.toString())
	}

	setAttributes (attributes, selectedAttributes) {
		console.log("gets called")
		if (selectedAttributes == this.config.selectedAttributes) return
		this.config.attributes = []
		this.config.selectedAttributes = selectedAttributes

		_.each(attributes, (attribute, index) => {
			_.each(selectedAttributes, selectedAttribute => {
				if (attribute == selectedAttribute) {
					this.config.attributes.push({attribute: attribute, index: index})
				}
			})
		})
		this.outputs[0].setLabel(selectedAttributes.toString())
		console.log(selectedAttributes.toString())
	}

	_perform () {
		// take incoming data from this.inputs array
		let output = []
		_.each(this.config.attributes, attribute => {
			output.push(this.inputs[0].data[attribute.index])
		})
		// process it

		// and send result to the edge._end of this.outputs array
		if (this.outputs[0].edge) {
			this.outputs[0].edge._end.data = output
		}
	}

	_log (args) {
		
	}


}