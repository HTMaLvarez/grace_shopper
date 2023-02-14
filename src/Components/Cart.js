import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder, logout, updateCart } from "../store";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  console.log("this is dougs cart", cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.lineItems.map((item) => (
          <div key={item.id}>
            <p>{item.product.name}</p>
            <p>Quantity: {item.quantity} </p>
            <button
              onClick={() =>
                dispatch(updateCart(item.product.id, item.quantity))
              }
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(createNewOrder(cart))}>
        Create Order
      </button>
    </div>
  );
};

export default Cart;
