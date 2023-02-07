import React from 'react';

const SingleProduct = props => {
  const { product } = props;
  return (
    <div>
      <h2>{product.name}</h2>
    </div>
  );
};

export default SingleProduct;
