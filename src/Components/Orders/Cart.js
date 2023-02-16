import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateCart } from '../../store';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart } = useSelector(state => state);
  console.log('this is cart', cart);
  const dispatch = useDispatch();

  return (
    <div className="Cart">
      <h1>Cart</h1>
      <div className="LineItems">
        {cart.lineItems.map(item => (
          <div className="Item" key={item.id}>
            <p>{item.product.name}</p>
            <p>Qty: {item.quantity} </p>
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
