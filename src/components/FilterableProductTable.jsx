import ProductTable from './ProductTable';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [isInStockOnly, setIsInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        isInStockOnly={isInStockOnly}
        onFilterTextChange={setFilterText}
        onIsInStockOnlyChange={setIsInStockOnly}
      />
      <ProductTable
        filterText={filterText}
        isInStockOnly={isInStockOnly}
        products={products}
      />
    </div>
  );
}
