import {
  getData,
  getUserOrders,
  setOrder,
  updateOrder,
} from "../../../services/handlers/firestore";
import { orderActions } from "./orderSlice";

export const placeOrderHandler = (order) => {
  return async (dispatch) => {
    const orderDb = await setOrder(order);
    dispatch(orderActions.placeOrder(order));
    return orderDb.id;
  };
};

export const getOrder = (orderId) => {
  return async (dispatch) => {
    const order = await getData("orders", orderId);
    dispatch(orderActions.getOrder(order));
    return order;
  };
};

export const getAllOrdersHandler = (userEmail) => {
  return async (dispatch) => {
    const orders = await getUserOrders("orders", userEmail);
    dispatch(orderActions.getAllOrders(orders));
    return orders;
  };
};

export const payOrder = (orderId) => {
  return async (dispatch) => {
    await updateOrder("orders", orderId);
    const order = await dispatch(getOrder(orderId));
    return order;
  };
};
