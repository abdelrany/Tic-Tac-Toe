import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
]
const PLAYERS = {
	O: "Player 1",
	X: "Player 2",
}

function driveActivePlayer(gameTurns) {
	let currentPlayer = "X"

	if (gameTurns?.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O"
	}
	return currentPlayer
}

function chekingWinner(gameBoard, players) {
	let winner
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column]
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column]
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column]
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol]
		}
	}
	return winner
}
function driveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]

	for (const turn of gameTurns) {
		const { square, player } = turn
		const { row, col } = square
		gameBoard[row][col] = player
	}
	return gameBoard
}

function App() {
	const [gameTurns, setGameTurns] = useState([])
	const [players, setPlayers] = useState(PLAYERS)

	const activePlayer = driveActivePlayer(gameTurns)

	function handelActive(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = driveActivePlayer(prevTurns)
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			]
			return updatedTurns
		})
	}
	const gameBoard = driveGameBoard(gameTurns)
	const winner = chekingWinner(gameBoard, players)
	const hasDraw = gameTurns.length === 9 && !winner

	function handelResart() {
		setGameTurns([])
	}
	function handelChangePlayerName(symbol, newName) {
		setPlayers((old) => {
			return {
				...old,
				[symbol]: newName,
			}
		})
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						namePlayer={PLAYERS.X}
						symbolPlayer='X'
						activePlayer={activePlayer === "X"}
						onChangeName={handelChangePlayerName}
					/>
					<Player
						namePlayer={PLAYERS.O}
						symbolPlayer='O'
						activePlayer={activePlayer === "O"}
						onChangeName={handelChangePlayerName}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver
						winner={winner}
						hasDraw={hasDraw}
						onRestart={handelResart}
					/>
				)}
				<GameBoard onActive={handelActive} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
