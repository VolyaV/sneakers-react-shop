import React from 'react';
import Card from '../components/Card/index';
import AppContext from '../context';

const Favorites = () => {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((obj) => (
          <Card key={obj.id} {...obj} favorited={true} onFavorite={onAddToFavorite} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
