import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishes } from '../store';

const WishList = () => {
  const { auth } = useSelector(state => state);
  // enable dispatch
  const dispatch = useDispatch();
  const { wishList } = useSelector(state => state);
  console.log('this is wish list', wishList.wishlist);

  return (
    <div className="Wish">
      <h2>Wish List</h2>
      <div className="Wishes">
        {wishList.wishlist?.length > 0 ? (
          wishList.wishlist.map(product => (
            <div className="WishCard" key={product.id}>
              <Link to={`/products/${product.id}`}>{product.game}</Link>
            </div>
          ))
        ) : (
          <p>You have no products in your wish list</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
