import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

const AllProducts = () => {
  const { products } = useSelector(state => state);

  // create a 'search' state value
  const [search, setSearch] = useState('');

  // create a form within the comp
  const [searchResults, setSearchResults] = useState([]);

  // filter through the products to list the desired...
  useEffect(() => {
    const filteredGames = products.filter(game =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredGames);
  }, [products, search]);

  return (
    <div className="AllProducts">
      <p>All Games</p>
      <div className="ProductCards">
        <form className="searchForm" onSubmit={e => e.preventDefault()}>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            placeholder="Search Games"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>

        <ul className="ProductContainer">
          {searchResults.map(product => {
            return (
              <div className="Column" key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
