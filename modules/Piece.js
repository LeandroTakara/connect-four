class Piece {
	constructor(player, row, column, tileSize) {
		this.element = null
		this.player = player
		this.row = row
		this.column = column
		this.tileSize = tileSize
	}

	createElement(parentDiv) {
		this.element = document.createElement('div')
		this.element.classList.add('piece')
		this.element.classList.add(`player${this.player}`)

		parentDiv.appendChild(this.element)
	}

	drop() {
		this.element.style.left = `${this.tileSize * this.column + 5}px`
		this.element.style.top = `${-this.tileSize}px`

		setTimeout(() => 
			this.element.style.top = `${this.tileSize * this.row + 5}px`
		, 0)
	}

	mark() {
		this.element.classList.add('win')
	}
}

export default Piece
