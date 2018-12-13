/**************************************
 *	EDGE
 *	implements connections between
 *	different nodes in the flow
 **************************************/

const color = '#FFFFFF'
const width = 5
const linecap = 'round'

export default class Edge {

	constructor (canvas, connector) {
		this._line = null

		this._inConstruction = false
		this._canvas = canvas
		this._startX = connector.rbox(this._canvas).cx
		this._startY = connector.rbox(this._canvas).cy
		this._endX = null
		this._endY = null

		this._inConstruction = true
	}

	setEnd = function (connector) {
		this.endNode = connector
		console.log(this.endNode)
		this._endX = connector.rbox(this._canvas).cx
		this._endY = connector.rbox(this._canvas).cy
		this.drawEdge()
	}

	drawEdge = function () {
		this._line = this._canvas
		.line(this._startX, this._startY, this._endX, this._endY)
		.stroke({ color: color, width: width, linecap: linecap })
	}

	moveStart = function (x, y) {
		this.startX = x
		this.startY = y
		this._line.plot(this._startX, this._startY, this._endX, this._endY)
	}

	moveEnd = function (x, y) {
		this.endX = x
		this.endY = y
		this._line.plot(this._startX, this._startY, this._endX, this._endY)
	}

}