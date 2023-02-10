import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { product } = props;

  return (
    <div>
      <h2>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      {/*OTHER PREVIEW STUFF CAN GO HERE */}
    </div>
  );
};

export default ProductCard;
