import { createSlice } from '@reduxjs/toolkit';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    ids: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.ids = [...new Set([...state.ids,...action.payload])]
      return;
    },
  },
});

export default cartReducer.reducer;

export const { addToCart, updateCartQty, removeFromCart } = cartReducer.actions;
