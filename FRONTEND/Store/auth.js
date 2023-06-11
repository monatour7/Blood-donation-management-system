import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: '',
  id: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    loginAsDonor(state) {
      state.isAuthenticated = 'Donor';
    },
    loginAsHos(state) {
      state.isAuthenticated = 'Hos';
    },
    logout(state) {
      state.isAuthenticated = 'No';
    },
    setUserId(state, action) {
      state.id = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
