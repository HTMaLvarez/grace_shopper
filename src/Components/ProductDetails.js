import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct, addToCart } from '../store';
import { useParams } from 'react-router-dom'; //turns out this is "props.match.params"

const ProductDetails = () => {
  // create a quantity state - call 'setQuantity + 1' with button 'onClick' and use that as quantity param with 'addToCart'
  const [quantity, setQuantity] = useState(1);

  const { singleProduct } = useSelector(state => state);
  // console.log('this is single product', singleProduct);
  const { id } = useParams(); //turns out this is "props.match.params"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  return (
    <div>
      <h1>Product Details Page</h1>
      <button
        onClick={() => {
          dispatch(addToWishList(singleProduct));
        }}
      >
        Add To Wish List
      </button>
      <h2>{singleProduct.name}</h2>
      <button
        onClick={() => {
          dispatch(addToCart(singleProduct, 1));
        }}
      >
        Add To Cart
      </button>
    <div className="Details">
      <div className="GameName">
        <h2>{singleProduct.name}</h2>
      </div>

      <div className="Form">
        <form>
          <input type="text" placeholder={quantity} />
          <button onClick={() => setQuantity(quantity + 1)}> + </button>
        </form>

        <button
          onClick={() => {
            dispatch(addToCart(singleProduct, quantity));
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
