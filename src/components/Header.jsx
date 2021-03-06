import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = ({ handleCart }) => {
  const { totalPrice } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex ">
        <li onClick={handleCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>{totalPrice}грн.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="/img/heart.svg"
              alt="favorites"
            />
          </Link>
        </li>
        <Link to="/orders">
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
