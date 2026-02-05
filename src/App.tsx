import { useState } from "react";
import "./App.css";
import { LOSER_MESSAGES, TILE_EMOJI, MONEY_EMOJI } from "./constants";
import { playSound, getRandomMessage } from "./utils";

export default function App() {
  const [gridSize, setGridSize] = useState<3 | 4>(4);
  const [clickedTiles, setClickedTiles] = useState<Set<number>>(new Set());
  const [loserTile, setLoserTile] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loserMessage, setLoserMessage] = useState("");

  const total = gridSize * gridSize;

  const handleTileClick = (index: number) => {
    if (gameOver || clickedTiles.has(index)) return;

    const remainingTiles = total - clickedTiles.size;
    const isLoser = Math.random() < (1 / remainingTiles);

    if (isLoser || remainingTiles === 1) {
      playSound("lose");
      setLoserTile(index);
      setGameOver(true);
      setLoserMessage(getRandomMessage(LOSER_MESSAGES));
      setShowModal(true);
    } else {
      playSound("click");
      setClickedTiles((prev) => new Set([...prev, index]));
    }
  };

  const resetGame = () => {
    setClickedTiles(new Set());
    setLoserTile(null);
    setGameOver(false);
    setShowModal(false);
  };

  const handleGridSizeChange = (size: 3 | 4) => {
    setGridSize(size);
    resetGame();
  };

  const getTileDisplay = (index: number) => {
    if (clickedTiles.has(index)) return "";
    return TILE_EMOJI;
  };

  const getTileClass = (index: number) => {
    if (loserTile === index) return "tile loser";
    if (clickedTiles.has(index)) return "tile safe";
    return "tile";
  };

  return (
    <div className="app">
      <h1 className="title">Bill Roulette</h1>

      <div className="grid-toggle">
        <button
          className={gridSize === 3 ? "active" : ""}
          onClick={() => handleGridSizeChange(3)}
        >
          3×3
        </button>
        <button
          className={gridSize === 4 ? "active" : ""}
          onClick={() => handleGridSizeChange(4)}
        >
          4×4
        </button>
      </div>

      <p className={`status ${gameOver ? "loser" : ""}`}>
        {gameOver 
          ? `${MONEY_EMOJI} Someone's paying! ${MONEY_EMOJI}` 
          : `${total - clickedTiles.size} pizzas left... who dares?`}
      </p>

      <div
        className="grid"
        style={{ "--grid-cols": gridSize } as React.CSSProperties}
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={getTileClass(i)}
            onClick={() => handleTileClick(i)}
            disabled={gameOver || clickedTiles.has(i)}
          >
            {getTileDisplay(i)}
          </button>
        ))}
      </div>

      {gameOver && !showModal && (
        <button className="reset-btn" onClick={resetGame}>
          🔄 Play Again
        </button>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Confetti pieces */}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="confetti" />
            ))}
            <div className="modal-emoji">{MONEY_EMOJI}</div>
            <h2 className="modal-title">YOU PAY!</h2>
            <p className="modal-message">{loserMessage}</p>
            <button className="modal-btn" onClick={resetGame}>
              🔄 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
