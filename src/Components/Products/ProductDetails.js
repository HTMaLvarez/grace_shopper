import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct, addToCart } from '../../store';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  // create a quantity state - call 'setQuantity' 'onClick'
  const [quantity, setQuantity] = useState(0);

  // desctruct single product from state
  const { singleProduct } = useSelector(state => state);

  // useParams to grab the id - same as match.params.id
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  const add = () => {
    dispatch(addToCart(singleProduct, quantity));
    setQuantity(0);
  };

  // set auth var.
  const { auth } = useSelector(state => state);

  return (
    <div className="Details">
      <div className="GameName">
        <h2>{singleProduct.name}</h2>
      </div>
      {/* <div className="ImageBox"> */}
      <img src={`static/${singleProduct.imageURL}`}></img>
      {/* </div> */}
      {auth.id ? (
        <div className="ItemQuantity">
          <form>
            <button onClick={() => setQuantity(quantity - 1)}> - </button>
            <input className="Quantity" type="text" placeholder={quantity} />
            <button onClick={() => setQuantity(quantity + 1)}> + </button>
          </form>

          <button onClick={add}>Add To Cart</button>
        </div>
      ) : (
        <div>
          <Link to="/sign-up">
            please create an account if you wish to shop
          </Link>
          <br></br>
          <Link to="/sign-in">or sign in to your account</Link>
        </div>
      )}

      <div className="Description">
        <p>{singleProduct.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
