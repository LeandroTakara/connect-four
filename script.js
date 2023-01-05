import ConnectFour from './modules/ConnectFour.js'

function createButtons() {
	for (let i = 0; i < 7; i++) {
		const btn = document.createElement('div')
		btn.classList.add('btn-game')

		const key = document.createElement('div')
		key.classList.add('key')
		key.innerHTML = controls[i]

		// mouse
		btn.addEventListener('click', () => clickButton(btn, i))
		// keyboard
		keys[controls[i]] = () => clickButton(btn, i)
		divControls.appendChild(key)

		divButtons.appendChild(btn)
	}
}

function clickButton(button, column) {
	if (game.state === 'playing') {
		const row = game.getRow(column)

		if (row === 0) button.classList.add('full')

		game.createPiece(row, column)
		if (game.hasFinished()) game.showResults()
		else game.nextTurn()
	}
}

// DOM elements
const btnNewGame = document.getElementById('newGame')
const divButtons = document.querySelector('.buttons')
const divControls = document.querySelector('.controls')

const game = new ConnectFour()
const controls = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const keys = {}

btnNewGame.addEventListener('click', () => {
	game.resetGame()
	document.querySelectorAll('.full').forEach(btn => btn.classList.remove('full'))
})

// keyboard
addEventListener('keydown', e => {
	const key = e.key
	const func = keys[key]

	if (func) func()
})

createButtons()
game.createGame()
