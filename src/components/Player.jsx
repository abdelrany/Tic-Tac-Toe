import React, { useState } from "react"

function Player({ namePlayer, symbolPlayer, activePlayer, onChangeName }) {
	const [playerName, setPlayerName] = useState(namePlayer)
	const [isEditing, setIsEditing] = useState(false)

	function handelEditClick() {
		setIsEditing((old) => !old)
		if (isEditing) {
			onChangeName(symbolPlayer, playerName)
		}
	}
	function handelChange(event) {
		setPlayerName(event.target.value)
	}
	return (
		<>
			<li className={activePlayer ? "active" : undefined}>
				<span className='player'>
					{isEditing ? (
						<input
							type='text'
							required
							value={playerName}
							onChange={handelChange}
						/>
					) : (
						<span className='player-name'>{playerName}</span>
					)}

					<span className='player-symbol'>{symbolPlayer}</span>
				</span>

				<button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
			</li>
		</>
	)
}

export default Player
