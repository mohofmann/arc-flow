/**************************************
 *	EDGE
 *	implements connections between
 *	different nodes in the flow
 **************************************/

const color = '#FFFFFF'
const width = 3
const linecap = 'round'

export default class Edge {

	constructor (canvas, connector) {
		this._line = null

		this._inConstruction = false
		this._canvas = canvas
		this._start = connector

		this.drawEdge()
	}

	setEnd = function (connector) {
		this._end = connector
		if (this._start.type != this._end.type) {
			this.updatePosition()
			return true
		} else {
			return false
		}
	}

	followMouse = function (pos) {
		let startPos = this._start.getPos()
		this._line.plot(startPos.x, startPos.y, pos.x, pos.y)
	}

	drawEdge = function () {
		let startPos = this._start.getPos()
		let endPos = this._start.getPos()
		this._line = this._canvas
		.line(startPos.x,
			startPos.y,
			endPos.x,
			endPos.y)
		.stroke({ color: color, width: width, linecap: linecap })
		.back()
	}

	updatePosition = function () {
		let startPos = this._start.getPos()
		let endPos = this._end.getPos()
		this._line.plot(startPos.x,
			startPos.y,
			endPos.x,
			endPos.y)
	}

	remove = function () {
		this._start.edge = null
		this._end.edge = null
		this._line && this._line.remove()
	}

}