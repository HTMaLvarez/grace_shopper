import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const { checkout } = require('../../stripe');
// import { checkout } from '../../stripe';
import { logout, updateCart, fetchUser, createNewOrder } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {
  //useSelector to get our auth state
  const { auth } = useSelector(state => state);

  // create an active state for modal
  const [isActive, setActive] = useState('true');

  // set cart var.
  const { cart } = useSelector(state => state);

  // cart price total
  const cartSubTotal = cart.lineItems.reduce((acc, curr) => {
    return acc + curr.product.price * curr.quantity;
  }, 0);

  // cart quantity total
  const cartQuantityTotal = cart.lineItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  // set id var. to fetchUser
  const id = auth.id;

  // allow dispatch from store/thunk
  const dispatch = useDispatch();

  // active toggle to display model
  const toggleActive = () => {
    setActive(!isActive);
  };

  // fetchUser on load
  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);
  // set user var.
  const user = useSelector(state => state);

  // checkout creates fetch request - connect with 'post' checkout-session - must pass in the cart data as 'req.body'
  // it passes the correct data and then renders the response (stripe url) to current window
  // see db/index.js for 'post'

  const checkout = async () => {
    await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.lineItems }),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/wish-list">Wishlist</Link>
        </li>
      </ul>

      {/* two buttons on the end for 'account' and 'cart'
       *** if auth is valid
       *** if cart has at least 1 item*/}
      <div className="NavButtons">
        {auth.id ? (
          <div className="AccountButton">
            <button>
              <Link to={`/users/${id}`}>ACCOUNT</Link>
            </button>
            <div className="CartButton">
              <button onClick={toggleActive}>CART</button>
            </div>
          </div>
        ) : (
          ''
        )}

        {/* if above clicked, modal is active (On)
        click 'close' to make (Off) */}
        <div className={isActive ? 'Off' : 'On'}>
          <div className="Cart">
            <button className="Close" onClick={toggleActive}>
              Close
            </button>
            <h3>{auth.username}'s' cart</h3>
            <p>
              ({cartQuantityTotal}) {cartQuantityTotal === 1 ? 'item' : 'items'}
            </p>
            <div className="LineItems">
              {cart.lineItems.map(item => (
                <div className="Item" key={item.id}>
                  <div className="NamePrice">
                    <p>{item.product.name}</p>
                    <p>qty: {item.quantity}</p>
                  </div>

                  <div className="ModalButton">
                    <button
                      onClick={() =>
                        dispatch(updateCart(item.product.id, item.quantity))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="CreateOrder">
              <button onClick={() => dispatch(createNewOrder(cart))}>
                Create Order
              </button>
            </div>
            <div className="ModalFooter">
              <p>
                Cart Total <strong>{cartSubTotal}</strong>
              </p>
              <button className="Checkout" onClick={checkout}>
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
