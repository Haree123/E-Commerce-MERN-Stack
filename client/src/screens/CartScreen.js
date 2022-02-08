import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './css/Cart.css';
import Loader from '../components/Loader';

const CartScreen = () => {
  const email = useSelector((state) => state.auth.email);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQty, setItemQty] = useState([]);

  //Use Effect
  useEffect(() => {
    const getCartProductsById = async () => {
      setLoading(true);
      return await axios
        .get(`/api/cart/${email}`)
        .then((response) => {
          setProducts(response.data.products);
          setTotalPrice(response.data.totalPrice);
          setItemQty(response.data.cart);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getCartProductsById();
  }, [email, products.length]);

  const Cart = ({ item, i, arr }) => {
    let id = item._id;

    const fetch = async (props) => {
      await axios.put(props).then((res) => {
        if (res.data.status === 'Success') {
          setTotalPrice(res.data.totalPrice);
          setItemQty(res.data.cart);
        }
      });
    };

    //set Quantity for particular product
    const quantity = () => {
      for (let i = 0; i < itemQty.length; i++) {
        if (itemQty[i].pid === id) {
          return <p>Qty: {itemQty[i].qty}</p>;
        }
      }
    };

    const addQty = async () => {
      const url = `/api/updateQty/${email}/${id}/1`;
      if (itemQty[i].qty < 5) {
        fetch(url);
      }
    };

    const minusQty = async () => {
      const url = `/api/updateQty/${email}/${id}/-1`;
      if (itemQty[i].qty > 1) {
        fetch(url);
      }
    };

    const removeItem = async () => {
      await axios
        .delete(`/api/deleteCart/${email}/${id}`)
        .then((res) => {
          setLoading(true);
          if (res.data === 'Success') {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <div key={i}>
        <div
          className={`cart-left-contents ${
            i + 1 === arr.length && 'cart-left-contents-last-child'
          }`}>
          <div>
            <img
              className='cart-left-img'
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
          <div>
            <p className='cart-left-name'>{item.name}</p>
            <p className='cart-left-brand'>{item.brand}</p>
            <p className='cart-left-seller'>Seller: {item.seller}</p>
            <p className='cart-left-price'>₹ {item.price}</p>
          </div>
          <div className='cart-left-delivery-time'>
            <p>
              Delivery in 2 days |{' '}
              <span className='cart-left-delivery-price'>Free</span>
            </p>
            {quantity()}
          </div>
        </div>
        <div className='cart-left-content-footer'>
          <button className='cart-left-btn-quantity' onClick={() => minusQty()}>
            -
          </button>
          <button className='cart-left-btn-quantity' onClick={() => addQty()}>
            +
          </button>
          <button className='cart-left-btn-remove' onClick={() => removeItem()}>
            REMOVE
          </button>
        </div>
        {i + 1 === arr.length ? null : <hr />}
      </div>
    );
  };

  const CartEmpty = () => {
    return (
      <div className='cart-empty'>
        <p className='cart-empty-p1'>Your Cart is Empty !</p>
        <p className='cart-empty-p2'>Add Items to your Cart</p>
        <button className='cart-empty-btn'>
          <Link className='link-tag-nostyle link-color' to='/'>
            Shop Now
          </Link>
        </button>
      </div>
    );
  };

  const CartLeft = () => {
    return (
      <div className='cart-left'>
        <div className='cart-left-header'>
          <span>My Cart</span>
          <span className='cart-left-delivery-pincode'>Deliver to</span>
        </div>
        <hr />
        {products.map((item, i, arr) => (
          <Cart key={i} item={item} i={i} arr={arr} />
        ))}
      </div>
    );
  };

  const CartRight = () => {
    return (
      <div className='cart-right'>
        <div>
          <p className='cart-right-header'>Price Details</p>
          <hr />
        </div>
        <div className='cart-right-contents'>
          <div>
            <p className='cart-right-price cart-right-content-padding'>
              Price{' '}
              {products.length > 1 && <span>({products.length} items)</span>}
            </p>
            <p className='cart-right-discount cart-right-content-padding'>
              Discount
            </p>
            <p className='cart-right-delivery-charge cart-right-content-padding'>
              Delivery Charges
            </p>
            <p className='cart-right-total-amt'>Total Amount</p>
          </div>
        </div>
        <div className='cart-right-contents cart-right-contents-margin'>
          <p className='cart-right-content-padding'>₹ {totalPrice} </p>
          <p className='cart-right-content-padding'>0</p>
          <p className='cart-right-content-padding'>Free</p>
          <p className='cart-right-content-padding'>₹ {totalPrice}</p>
        </div>
        <div>
          <Link className='link-tag-nostyle link-color' to='/shipping'>
            <button className='cart-right-buy-now'>Place Order</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : products.length < 1 ? (
        <CartEmpty />
      ) : (
        <>
          <div className='cart'>
            <CartLeft />
            <CartRight />
          </div>
        </>
      )}
    </>
  );
};

export default CartScreen;
