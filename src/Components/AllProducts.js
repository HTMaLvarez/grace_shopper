import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>All Products </h1>
      {product.map(product => {
        return (
          <div key={product.id}>
            {product.name}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
