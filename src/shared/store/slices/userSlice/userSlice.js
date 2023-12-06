import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  shippingAddress: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLog: (state, action) => {
      if (!action.payload) state.user = action.payload;
      else
        state.user = {
          displayName: action.payload.displayName,
          imageUrl: action.payload.photoURL,
          id: action.payload.uid,
          email: action.payload.email,
        };
    },

    setShippings: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
