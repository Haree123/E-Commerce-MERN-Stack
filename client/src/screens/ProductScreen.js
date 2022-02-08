import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './css/Product.css';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);
  const auth = useSelector((state) => state.auth.authenticated);

  let id = params.id;
  let url = `/getProduct/${id}/${email}`;

  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  //checking the product is in cart by GET method
  let [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      return await axios
        .get(url)
        .then((response) => {
          setProduct(response.data.product);
          setProductInCart(response.data.cart);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getProduct();
  }, [id, url]);

  const addToCartStore = async () => {
    //check if user authenticated
    if (auth) {
      let price = product.price;
      let data = { id, email, price };
      return await axios
        .post('/api/addToCart', data)
        .then((res) => {
          if (res.data.status === 'Success') {
            setLoading(true);
            setProductInCart(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/signin');
    }
  };

  const Products = () => {
    return (
      <div className='products'>
        <img
          className='products-img'
          src={product.imageUrl}
          alt={product.name}
        />
        <div className=' vertical-line'></div>
        <div className='products-right'>
          <div>
            <span className='products-name'>{product.name}</span>
            <i className='fas fa-heart products-wishlist' />
          </div>
          <p className='products-description'>{product.description}</p>
          <p className='products-price'>
            <span className='products-price-deal'>Deal Price:</span> ₹{' '}
            {product.price}
          </p>
          <div className='product-rating-reviews'>
            <span className='product-rating'>
              <Rating value={product.rating} />
            </span>
            &emsp;
            <span className='product-reviews'>
              {product.numReviews} reviews
            </span>
          </div>
          <p>{product.countInStock === '0' && 'Out Of Stock'}</p>
          <div>
            <span className='products-seller-title'>Seller - </span>
            <span className='products-seller-name'>{product.seller}</span>
          </div>
          <div className='products-services'>
            <p>Services</p>
            <ul>
              <li>
                <i className='fas fa-sync-alt' />
                &nbsp; 14 days Return Policy
              </li>
              <li>
                <i className='fas fa-money-bill' />
                &nbsp; Cash on Delivery Available
              </li>
            </ul>
          </div>
          <div className='products-delivery'>
            <span>
              <i className='fas fa-map-marker-alt' />{' '}
              <small>
                {' '}
                <b> Deliver to 641604 by Dec 14, Tuesday</b>
              </small>
            </span>
          </div>
          <div>
            <Link className='link-tag-nostyle link-color' to='/shipping'>
              <button
                type='button'
                className='products-btn products-btn-buynow'
                value='Buy Now'
                disabled={product.countInStock === '0' ? true : false}>
                Buy Now
              </button>
            </Link>
            {productInCart ? (
              <Link className='link-tag-nostyle link-color' to='/cart'>
                <button
                  type='button'
                  className='products-btn products-btn-addCart'
                  value='Go to Cart'>
                  Go to Cart
                </button>
              </Link>
            ) : (
              <button
                type='button'
                className='products-btn products-btn-addCart'
                value='Buy Now'
                disabled={product.countInStock === '0' ? true : false}
                onClick={() => addToCartStore()}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <Loader loading={loading} />
        </>
      ) : (
        <div>
          <Products />
        </div>
      )}
    </>
  );
};

export default ProductScreen;
