import React from 'react';
import Card from './components/Card/index';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  React.useEffect(() => {
    axios
      .get('https://614ef4bcb4f6d30017b483f6.mockapi.io/items')
      .then(({ data }) => setItems(data));
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...cartItems, obj]);
  };
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={handleCart} />}
      <Header handleCart={handleCart} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card key={obj.id} {...obj} onPlus={(obj) => onAddToCart(obj)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
