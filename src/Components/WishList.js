import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishes } from '../store';

const WishList = () => {
  const { auth } = useSelector(state => state);
  // enable dispatch
  const dispatch = useDispatch();
  const { wishList } = useSelector(state => state);

  return (
    <div className="Wish">
      <h2>Wish List</h2>
      <div className="Wishes">
        {wishList.wishlist?.length > 0 ? (
          wishList.wishlist.map(product => (
            <div className="WishCard" key={product.id}>
              {/* <Link to={`/products/${product.id}`}>{product.game}</Link> */}
              {product.game}
            </div>
          ))
        ) : (
          <p>You have no products in your wish list</p>
        )}
      </div>
      <div>
        <Link to="/products">Browse Games</Link>
      </div>
    </div>
  );
};

export default WishList;
