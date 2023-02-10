import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct, fetchCart } from '../store';
import { useParams } from 'react-router-dom'; //turns out this is "props.match.params"

const ProductDetails = () => {
  const { singleProduct } = useSelector(state => state);
  const { id } = useParams(); //turns out this is "props.match.params"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  return (
    <div>
      <h1>Product Details Page</h1>
      <h2>{singleProduct.name}</h2>
      <button>Add To Cart</button>
    </div>
  );
};

export default ProductDetails;
