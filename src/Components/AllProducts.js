import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

const AllProducts = () => {
  const { products } = useSelector(state => state);
  // console.log(products);

  // create a 'search' state value
  const [search, setSearch] = useState('');
  // create a 'searchResults' state value
  // craete a form within the comp
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
      <h1>All Products </h1>
      <div className="ProductCards">
        <div className="Form">
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
        </div>

        <ul>
          {searchResults.map(product => {
            return (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
//<Link to={`/product/${product.id}`}>{product.name}</Link>
