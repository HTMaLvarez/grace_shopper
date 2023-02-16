import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WishList = () => {
  const { wishList } = useSelector((state) => state);
  console.log("this is wish list", wishList);
  return (
    <div>
      <h2>Wish List</h2>
      <div>
        {wishList?.length > 0 ? (
          wishList.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
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
