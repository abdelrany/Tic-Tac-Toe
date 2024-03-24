import React from "react"

const GameOver = ({ winner, hasDraw, onRestart }) => {
	return (
		<div id='game-over'>
			<h2>GameOver</h2>
			{winner && <p>the winner is {winner}</p>}
			{hasDraw && <p>It's a Draw </p>}
			<button onClick={onRestart}>Rematch</button>
		</div>
	)
}

export default GameOver
