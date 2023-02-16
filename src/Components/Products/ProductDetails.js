import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct, addToCart } from '../../store';
import { useParams, Link } from 'react-router-dom';
import { createNewWish, fetchWishes } from '../../store';

const ProductDetails = () => {
  // enable dispatch
  const dispatch = useDispatch();

  // useParams to grab the product id - which is params.id
  const { id } = useParams();

  // set auth var.
  const { auth } = useSelector(state => state);

  // set the logged in user's id var
  const userId = auth.id;

  // fetch the product
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  // desctruct single product from state
  const { singleProduct } = useSelector(state => state);

  const { wishList } = useSelector(state => state);

  // create a quantity state - call 'setQuantity' 'onClick'
  const [quantity, setQuantity] = useState(0);

  // add item - dispatch AddToCart and reset quantity
  const add = () => {
    dispatch(addToCart(singleProduct, quantity));
    setQuantity(0);
  };

  const addToWishlist = () => {
    dispatch(createNewWish({ game: singleProduct.name }));
  };

  return (
    <div className="Details">
      <div className="GameName">
        <h2>{singleProduct.name}</h2>
      </div>
      <img src={`static/${singleProduct.imageURL}`}></img>

      {auth.id ? (
        <div className="ItemQuantity">
          <form>
            <button onClick={() => setQuantity(quantity - 1)}> - </button>
            <input className="Quantity" type="text" placeholder={quantity} />
            <button onClick={() => setQuantity(quantity + 1)}> + </button>
          </form>

          <button onClick={add}>Add To Cart</button>
          <button onClick={addToWishlist}>Add to Wishlist</button>
        </div>
      ) : (
        <div className="CreateAccount">
          <br></br>
          <Link to="/sign-in">
            Please Sign In to create a cart with your account.
          </Link>
        </div>
      )}

      <div className="Description">
        <p>{singleProduct.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
