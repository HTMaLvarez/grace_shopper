import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Modal = () => {
  const [open, setOpen] = useState('false');
  // const handleOpen = () => setOpen('true');
  const handleClose = () => setOpen('false');
  const [isActive, setActive] = useState('true');
  const toggleActive = () => {
    setActive(!isActive);
  };
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();
  // destruct and make available - auth attributes
  const { auth } = useSelector(state => state);
  return (
    <div className={isActive ? 'Off' : 'On'}>
      <div className="Cart">
        <div className="ModalHeader">
          <button className="Close" onClick={toggleActive}>
            Close
          </button>
          <h3>{auth.username}'s cart</h3>

          <p>
            ({cart.lineItems.length}){' '}
            {cart.lineItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>
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
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="ModalFooter">
          <p>Cart Total $27.00</p>
          <button className="Checkout" onClick={() => checkout()}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
