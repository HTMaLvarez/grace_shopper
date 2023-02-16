import React, { useEffect } from 'react';
// components
import Header from './Framework/Header.js.js';
import Nav from './Framework/Nav';
import Home from './Framework/Home';
import Footer from './Framework/Footer';
import Login from './Login';
import SignUp from './SignUp';
import AllProducts from './Products/AllProducts';
import ProductDetails from './Products/ProductDetails';
import Cart from './Orders/Cart';
import PastOrders from './Orders/PastOrders';
import Success from './Orders/Success';
import Cancel from './Orders/Cancel';
import Users from './Users/Users';
import UserDetails from './Users/UserDetails';
import WishList from './WishList';
import NotFound from './Framework/NotFound';

// state and token
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store';
// import { Link, Routes, Route } from 'react-router-dom';
import { loginWithToken, fetchCart } from '../store';
// browser and routes
import { HashRouter as Router, Routes, Switch, Route } from 'react-router-dom';

const App = () => {
  //useSelector to get our auth state
  const { auth } = useSelector(state => state);

  // allow dispatch from store/thunk
  const dispatch = useDispatch();

  // fetchToken on load
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);
  // check if we're authorized and get the cart
  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  // fetch products on load
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // our makeshift version of protected routes - tried the implementation to no avail so that code is commented out below the export statement
  // use ternary's to render specific pages based on if we're logged in or not. User can view products however will get a 'please create an account... ' if not logged in.
  // same goes for account access and cart - will not render unless logged in

  return (
    <>
      <Router>
        <Header title="VIDEO GAMES" />
        <Nav />
        {auth.id ? (
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/sign-in" element={<Login />} />
              <Route exact path="/users/:id" element={<UserDetails />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/cancel" element={<Cancel />} />
              <Route exact path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-history" element={<PastOrders />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/wish-list" element={<WishList />} />
            </Routes>
          </div>
        ) : (
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/sign-in" element={<Login />} />
              <Route exact path="/users/:id" element={<UserDetails />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/cancel" element={<Cancel />} />
              <Route exact path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-history" element={<PastOrders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}

        <Footer />
      </Router>
    </>
  );
};

export default App;
