import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const today = new Date();
  const { cart } = useSelector(state => state);
  const cartQuantityTotal = cart.lineItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <footer className="Footer">
      <p>Copyright &copy; {today.getFullYear()}</p>
      <p>HTMaLvarez</p>

      <p className="SimpleText">
        Cart: ({cartQuantityTotal}) {cartQuantityTotal === 1 ? 'item' : 'items'}
      </p>
    </footer>
  );
};

export default Footer;
