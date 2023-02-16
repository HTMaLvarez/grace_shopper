import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { product } = props;

  return (
    <Link to={`/products/${product.id}`}>
      <div className="CardContainer">
        <div className="CardHeader">
          <h3>{product.name}</h3>
        </div>
        <div className="ImageBox">
          <img src={`static/${product.imageURL}`} sizes="200px"></img>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
