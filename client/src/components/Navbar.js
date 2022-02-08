import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/Navbar.css';
import { authAction } from './../redux/authRedux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useSelector((state) => state.auth.authenticated);
  let name = useSelector((state) => state.auth.name);
  let urlName = window.location.href.split('/');

  const logout = async () => {
    return await axios
      .get('/logout')
      .then((response) => {
        if (response.data.message === 'Logged Out') {
          navigate('/', { replace: true });
          dispatch(
            authAction({
              name: null,
              email: null,
            })
          );
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='navbar'>
      <div className='navbar-title'>
        <Link className='navbar-title' to='/'>
          ProShop
        </Link>
      </div>

      {/* The Search bar should not be visible in signup and signin screens 
      so in here we are getting the link name and in that we are splitting the link
      with '/' and we get the values in array, we are checking the array values here
      with index */}
      {urlName[3] === 'signin' ? null : urlName[3] ===
        'signup' ? null : urlName[3] === 'shipping' ? null : (
        <form className='navbar-form'>
          <input
            className='navbar-search'
            type='text'
            placeholder='Search for products, brands and more'
          />
          <button className='navbar-search-btn' type='submit'>
            <i className='fa fa-search' />
          </button>
        </form>
      )}

      <ul className='navbar-link-item'>
        <li className='navbar-link-items'>
          <Link to='/cart' className='navbar-link-items-style'>
            <i className='fas fa-shopping-cart'></i>&nbsp;Cart
          </Link>
        </li>
        <li className='navbar-link-items'>
          <Link to='/wishlist' className='navbar-link-items-style'>
            <i className='fas fa-heart'></i>&nbsp;Wishlist
          </Link>
        </li>
        &nbsp;
        {auth ? (
          <>
            <li className='navbar-link-items navbar-user'>
              &nbsp; {name} &nbsp;
              <i className='fas fa-angle-down'></i>
              <div className='navbar-user-dropdown'>
                <Link className='navbar-user-dropdown-link' to='/profile'>
                  Profile
                </Link>
                <br />
                <button
                  className='navbar-user-logout'
                  type='button'
                  onClick={() => logout()}>
                  Log Out
                </button>
              </div>
            </li>
          </>
        ) : (
          <li className='navbar-link-items'>
            {' '}
            <Link to='/signin' className='navbar-link-items-style'>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
