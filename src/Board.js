import Square from "./Square";
import React from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Board({
  history,
  currentStep,
  xIsNext,
  onPlay,
  hoveredStep,
}) {
  const currentSquares = history[currentStep].squares;
  const hoveredSquares =
    hoveredStep !== null ? history[hoveredStep].squares : null;

  function handleClick(i) {
    if (currentSquares[i] !== null || calculateWinner(currentSquares)) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    const row = Math.floor(i / 3);
    const col = i % 3;
    onPlay(nextSquares, { row, col });
  }

  let status;
  const result = calculateWinner(currentSquares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];

  if (winner) {
    status = "Winner is " + winner;
  } else if (currentSquares.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next Player is " + (xIsNext ? "X" : "O");
  }

  function renderSquare(i) {
    const isHighlighted = hoveredSquares && hoveredSquares[i] !== null;
    return (
      <Square
        key={i}
        value={currentSquares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={winningLine.includes(i)}
        hoverHighlight={isHighlighted}
      />
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </>
  );
}
