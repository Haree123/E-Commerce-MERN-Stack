import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/Home.css';
import AllProducts from '../components/AllProducts.js';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      return await axios
        .get('/getAllProducts')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, []);
  return (
    <div className='home'>
      <hr />
      {loading ? (
        <>
          <Loader loading={loading} />
        </>
      ) : (
        <>
          <h2 className='home-title'>Latest Products</h2>
          <div className='home-products-container'>
            {products.map((x, i) => (
              <AllProducts key={i} data={x} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
