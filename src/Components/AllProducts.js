import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const { products } = useSelector(state => state);

  return (
    <div>
      <h1>All Products </h1>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
//<Link to={`/product/${product.id}`}>{product.name}</Link>
