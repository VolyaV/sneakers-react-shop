import React from 'react';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const handleCart = () => {
    setCartOpened(!cartOpened);
  };

  React.useEffect(() => {
    axios
      .get('https://614ef4bcb4f6d30017b483f6.mockapi.io/items')
      .then(({ data }) => setItems(data));
    axios
      .get('https://614ef4bcb4f6d30017b483f6.mockapi.io/cart')
      .then(({ data }) => setCartItems(data));
    axios
      .get('https://614ef4bcb4f6d30017b483f6.mockapi.io/favorites')
      .then(({ data }) => setFavorites(data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://614ef4bcb4f6d30017b483f6.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://614ef4bcb4f6d30017b483f6.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://614ef4bcb4f6d30017b483f6.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onRemove={onRemoveItem} items={cartItems} onClose={handleCart} />}
      <Header handleCart={handleCart} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route path="/favorites" exact element={<Favorites items={favorites} />} />
      </Routes>
    </div>
  );
}

export default App;
