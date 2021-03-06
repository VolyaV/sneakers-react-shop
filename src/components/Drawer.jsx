import React from 'react';
import axios from 'axios';
import Info from './Info';
import AppContext from '../context';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, items = [], onRemove }) => {
  const { totalPrice } = useCart();
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrederComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://614ef4bcb4f6d30017b483f6.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://614ef4bcb4f6d30017b483f6.mockapi.io/cart' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} грн. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} грн. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrederComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrederComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотябы одну пару кроссовок'
            }
            image={isOrederComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
