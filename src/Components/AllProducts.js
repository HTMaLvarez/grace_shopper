import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AllProducts = () => {
  const products = useSelector(state => state.product);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Products Page</h1>
      {/*map here */}
    </div>
  );
};

export default AllProducts;
