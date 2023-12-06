import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SessionStorageService from "../../../storage/sessionStorage";

const storedCart = SessionStorageService.getStoredData("multimart_cart");

const initialState = {
  cartItems: storedCart?.cartItems || [],
  totalAmount: storedCart?.totalAmount || 0,
  totalQuantity: storedCart?.totalQuantity || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const exixtingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      let cartItems;
      state.totalQuantity++;

      if (!exixtingItem) {
        cartItems = [
          ...state.cartItems,
          {
            ...newItem,
            quantity: 1,
          },
        ];
        state.cartItems = cartItems;
      } else {
        exixtingItem.quantity++;
        exixtingItem.totalPrice =
          Number(exixtingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      SessionStorageService.saveData("multimart_cart", {
        cartItems: cartItems || state.cartItems,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
      });

      toast.success("Product added successfully");
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== existingItem.id
      );

      state.totalQuantity = state.totalQuantity - existingItem.quantity;

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      SessionStorageService.saveData("multimart_cart", {
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
      });

      toast.success("Product removed successfully");
    },

    reduceItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== existingItem.id
        );

        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        toast.success("Product removed successfully");
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        state.totalAmount = state.totalAmount - Number(existingItem.price);
        state.totalQuantity = state.totalQuantity - 1;
        state.cartItems[existingItemIndex] = updatedItem;
        toast.success("Product removed successfully");
      }

      SessionStorageService.saveData("multimart_cart", {
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
      });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
