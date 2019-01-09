/**************************************
 *	EDGE
 *	implements connections between
 *	different nodes in the flow
 **************************************/

const color = '#FFFFFF'
const width = 5
const linecap = 'round'

export default class Edge {

	constructor (canvas, node) {
		this._line = null

		this._inConstruction = false
		this._canvas = canvas
		this._start = node
	}

	setEnd = function (node) {
		this._end = node
		this._startConnector = this._start.findConnector(this)
		this._endConnector = this._end.findConnector(this)
		this.drawEdge()
	}

	drawEdge = function () {
		this._line = this._canvas
		.line(this._startConnector.rbox(this._canvas).cx,
			this._startConnector.rbox(this._canvas).cy,
			this._endConnector.rbox(this._canvas).cx,
			this._endConnector.rbox(this._canvas).cy)
		.stroke({ color: color, width: width, linecap: linecap })
		.back()
	}

	updatePosition = function () {
		this._line.plot(this._startConnector.rbox(this._canvas).cx,
			this._startConnector.rbox(this._canvas).cy,
			this._endConnector.rbox(this._canvas).cx,
			this._endConnector.rbox(this._canvas).cy)
	}

	remove = function () {
		this._startConnector.edge = null
		this._endConnector.edge = null
		this._line.remove()
	}

}