import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  cardHeader: {
    backgroundImage: 'linear-gradient(rgb(87, 87, 87), rgb(19, 19, 19))',
    fontFamily: 'Orbitron, sans-serif',
    color: 'white',
  },
  cardMedia: {
    padding: 20,
  },
});

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
    <Container>
      {/* <div className="AllProducts"> */}
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
        <Container>
          <Grid container spacing={2}>
            {/* <ul className="ProductContainer"> */}
            {searchResults.map(product => {
              return (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
            {/* </ul> */}
          </Grid>
        </Container>

        {/* <ul className="ProductContainer">
            {searchResults.map(product => {
              return (
                <div className="Column" key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </ul> */}
      </div>
    </Container>
    // </div>
  );
};

export default AllProducts;
