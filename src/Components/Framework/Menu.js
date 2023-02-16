import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import AllProducts from '../Products/AllProducts';

const Menu = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <button>Browse Products</button>
        <button>My Account</button>
      </div>
    </div>
  );
};

export default Menu;
