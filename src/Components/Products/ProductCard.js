import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { product } = props;

  return (
    <div className="CardContainer">
      <div className="CardHeader">
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
      </div>
      <div className="ImageBox">
        <img src={`static/${product.imageURL}`} sizes="200px"></img>
      </div>
    </div>
  );
};

export default ProductCard;
