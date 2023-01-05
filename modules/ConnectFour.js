import Piece from './Piece.js'

const divTiles = document.querySelector('.tiles')
const divPieces = document.querySelector('.pieces')
const divResultsContainer = document.querySelector('.results-container')
const divResults = document.querySelector('.results')
const divTurn = document.querySelector('.turn')

const createMatrix = (rows, columns) => new Array(rows).fill(null).map(_ => new Array(columns).fill(null))

class ConnectFour {
	constructor() {
		this.rows = 6
		this.columns = 7
		this.turn = 1
		this.state = 'playing'
		this.tileSize = 50
		this.pieces = createMatrix(this.rows, this.columns)
		this.totalPieces = 0
		this.lastPiece = null
		this.inRowPieces = []
	}

	createGame() {
		this.resetGame()
		divTiles.innerHTML = ''

		for (let i = 0; i < this.rows * this.columns; i++) {
      const tile = document.createElement('div')
      tile.classList.add('tile')
      
      divTiles.appendChild(tile)
		}
	}

	resetGame() {
    divResultsContainer.classList.add('hidden')
    divPieces.innerHTML = ''
		this.turn = 1
		this.state = 'playing'
		this.pieces = createMatrix(this.rows, this.columns)
		this.totalPieces = 0
		this.lastPiece = null
		this.inRowPieces = []
		divTurn.innerHTML = `Turn: player ${this.turn} <div class="icon player${this.turn}"></div>`
	}

	nextTurn() {
    if (this.lastPiece) this.turn = this.turn === 1 ? 2 : 1
    divTurn.innerHTML = `Turn: player ${this.turn} <div class="icon player${this.turn}"></div>`
		this.inRowPieces = []
	}

  getRow(column) {
    return this.rows - this.pieces.filter(row => row[column]).length - 1
  }

	createPiece(row, column) {
    if (row < 0) {
      console.warn('[!] Column full')
      return
    }

		this.totalPieces++
		this.lastPiece = new Piece(this.turn, row, column, this.tileSize)
		this.pieces[row][column] = this.lastPiece
		this.lastPiece.createElement(divPieces)
		this.lastPiece.drop()
	}

	threeInRow(row, column, directions, check) {
		let total = 0
		const possibleInRow = []

		for (const [dRow, dColumn] of directions) {
			for (let i = 1; i < 4; i++) {
				const finalRow = row + dRow * i
				const finalColumn = column + dColumn * i
			
				if (this.pieces?.[finalRow]?.[finalColumn]?.player !== check) break

				possibleInRow.push(this.pieces[finalRow][finalColumn])
				total++
			}
		}

		if (total >= 3) {
			this.inRowPieces = possibleInRow
			return true
		}
		return false
	}

	hasFinished() {
		if (this.totalPieces === this.rows * this.columns) {
			this.state = 'draw'
      return true
		}

		const { row, column, player } = this.lastPiece

		const directionsSet = [
			// left + right
			[[0, -1], [0, 1]],
			// down
			[[1, 0]],
			// (down + left) + (up + right)
			[[1, -1], [-1, 1]],
			// (down + right) + (up + left)
			[[1, 1], [-1, -1]]
		]

		for (const directions of directionsSet) {
			if (this.threeInRow(row, column, directions, player)) {
				this.state = 'win'
      	return true
			}
		}

    return false
	}

	showResults() {
		const title = this.state === 'draw' ? 'Draw!!!' : `Player ${this.turn} wins!!!`

    divResultsContainer.classList.remove('hidden')

		divResults.innerHTML = `
  		<h2>${title}</h2>
		`
		this.lastPiece.mark()
		this.inRowPieces.forEach(pieces => pieces.mark())
	}
}

export default ConnectFour
