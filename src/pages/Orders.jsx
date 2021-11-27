import React from 'react';
import Card from '../components/Card/index';
import axios from 'axios';

const Orders = () => {
  const [orders, setOreders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://614ef4bcb4f6d30017b483f6.mockapi.io/orders');
        setOreders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card key={index} {...item} loading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
