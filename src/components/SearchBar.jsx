export default function SearchBar({
  filterText,
  isInStockOnly,
  onFilterTextChange,
  onIsInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isInStockOnly}
          onChange={e => onIsInStockOnlyChange(e.target.checked)}
        ></input>{' '}
        Only show products in stock
      </label>
    </form>
  );
}
