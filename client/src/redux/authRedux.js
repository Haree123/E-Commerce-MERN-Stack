import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'Authentication',
  initialState: {
    authenticated: false,
    name: null,
    email: null,
  },
  reducers: {
    authAction: (state, action) => {
      state.authenticated = action.payload.authenticated;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export default auth.reducer;

export const { authAction } = auth.actions;
