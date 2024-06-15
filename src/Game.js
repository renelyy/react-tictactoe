import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [hoveredStep, setHoveredStep] = useState(null);

  function handlePlay(nextSquares, location) {
    const nextHistory = history
      .slice(0, currentStep + 1)
      .concat([{ squares: nextSquares, location }]);
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setCurrentStep(step);
    setXIsNext(step % 2 === 0);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.location.row}, ${step.location.col})`
      : "Go to game start";
    return (
      <li
        key={move}
        onMouseEnter={() => setHoveredStep(move)}
        onMouseLeave={() => setHoveredStep(null)}
      >
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          history={history}
          currentStep={currentStep}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          hoveredStep={hoveredStep}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
