import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  function handelActive() {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            namePlayer="Player 1"
            symbolPlayer="X"
            activePlayer={activePlayer === "X"}
          />
          <Player
            namePlayer="Player 2"
            symbolPlayer="O"
            activePlayer={activePlayer === "O"}
          />
        </ol>
        <GameBoard onActive={handelActive} activePlayer={activePlayer} />
      </div>
      <Log />
    </main>
  );
}

export default App;
