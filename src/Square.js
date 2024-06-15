export default function Square({
  value,
  onSquareClick,
  highlight,
  hoverHighlight,
}) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""} ${
        hoverHighlight ? "hover-highlight" : ""
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
