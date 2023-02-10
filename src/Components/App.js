import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';

import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import SignUp from './SignUp';
import Nav from './Nav';
import Header from './Header.js';
import Footer from './Footer';
import Success from './Success';
import Cancel from './Cancel';
import Users from './Users';
import UserDetails from './UserDetails';

import AllProducts from './AllProducts';
import ProductCard from './ProductCard';
import { fetchProducts } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import ProductDetails from './ProductDetails';


const App = () => {
  //useSelector is like mapStateToProps, it gets state from store
  const { auth } = useSelector(state => state);

  //useDispatch refrences the thunk (or dispatch function) from store
  const dispatch = useDispatch();

  //useEffect is similar to componentDidMount & componentDidUpdate, it calls a function after the component renders
  // useEffect(() => {
  //   dispatch(loginWithToken());
  // }, []);

  useEffect(() => {
    if (auth.id) {
      // dispatch(fetchCart());
      console.log('success!');
    }
  }, [auth]);

  //
  return (
    <>
      <Header title="Video Game Store" />
      <Nav />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/users/:id" element={<UserDetails />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/cancel" element={<Cancel />} />
        </Routes>

        {/* {auth.id ? <Home /> : <SignUp />}


  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h1>Acme Shopping</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/products'>Store</Link>
        <Link to='/cart'>Cart</Link>
      </nav>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <Routes>

            <Route path="/cart" element={<Cart />} />
            <Route path="/sign-in" element={<Login />} />
            <Route exact path='/products' element={<AllProducts />} />
            <Route path='/products/:id' element={<ProductDetails />} />

          </Routes>
        </div>
      )} */}
      </div>
      <Footer />
    </>
  );
};

export default App;
