import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../../util/helpers";

const initialState = {
  order: {
    userDetails: {},
    orderDetails: {},
    isPaid: false,
    isDelivered: false,
    paidAt: "",
    deliveredAt: "",
    id: "",
  },
  allOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.order.userDetails = action.payload.userDetails;
      state.order.orderDetails = action.payload.orderDetails;
    },

    getOrder: (state, action) => {
      state.order.userDetails = action.payload.userDetails;
      state.order.orderDetails = action.payload.orderDetails;
      state.order.isPaid = action.payload.isPaid;
      state.order.isDelivered = action.payload.isDelivered;
      state.order.paidAt = action.payload.paidAt;
      state.order.deliveredAt = action.payload.deliveredAt;
      state.order.createdAt = action.payload.createdAt;
      state.order.id = action.payload.id;
    },

    getAllOrders: (state, action) => {
      state.allOrders = action.payload.map((order) => ({
        ...order,
        paidAt: formatDate(order.paidAt),
        deliveredAt: formatDate(order.deliveredAt),
        createdAt: formatDate(order.createdAt),
      }));
    },

    resetOrderDetails: (state) => {
      state.order.orderDetails = {};
    },

    updateOrder: (state, action) => {
      state.order.isPaid = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
