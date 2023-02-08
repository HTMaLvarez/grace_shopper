import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import AllProducts from './AllProducts';

const Home = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <AllProducts />
    </div>
  );
};

export default Home;
