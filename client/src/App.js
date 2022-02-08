import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import './App.css';
import { authAction } from './redux/authRedux';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddressScreen from './screens/ShippingScreen';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //This is for signup and signin page
  const PublicRoute = () => {
    const auth = JSON.parse(localStorage.getItem('logged_in_status'));
    if (auth) {
      return <Navigate to='/' replace={true} state={{ from: location }} />;
    }
    return <Outlet />;
  };

  const PrivateRoute = () => {
    const auth = JSON.parse(localStorage.getItem('logged_in_status'));
    if (!auth) {
      return (
        <Navigate to='/signin' replace={true} state={{ from: location }} />
      );
    }

    return <Outlet />;
  };

  useEffect(() => {
    const AuthStatus = async () => {
      return await axios.get('/loginstatus').then((res) => {
        if (
          res.data.message === 'No Token' ||
          res.data.message === 'Invalid Token'
        ) {
          localStorage.setItem('logged_in_status', JSON.stringify(false));
        }
        if (res.data.message === 'Valid Token') {
          dispatch(
            authAction({
              authenticated: true,
              name: res.data.name,
              email: res.data.email,
            })
          );
          localStorage.setItem('logged_in_status', JSON.stringify(true));
        }
      });
    };
    AuthStatus();
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/products/:id' element={<ProductScreen />} />
        <Route element={<PublicRoute />}>
          <Route path='/signin' element={<SignInScreen />} />
          <Route path='/signup' element={<SignUpScreen />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/wishlist' element={<WishlistScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<AddressScreen />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
