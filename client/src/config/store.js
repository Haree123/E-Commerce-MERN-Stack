import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import cartReducer from '../redux/cartRedux';
import authReducer from '../redux/authRedux';

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
