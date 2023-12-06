import { redirect } from "react-router-dom";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { getAllOrdersHandler } from "../../../../shared/store/slices/orderSlice/orderActions";
import { orderActions } from "../../../../shared/store/slices/orderSlice/orderSlice";

export const getUserOrdersLoader = async (dispatch) => {
  const storedUser = SessionStorageService.getStoredData("multimart_user");
  const storedOrders = SessionStorageService.getStoredData("multimart_orders");

  if (!storedUser) {
    return redirect("/login");
  }

  if (!storedOrders) {
    const orders = await dispatch(getAllOrdersHandler(storedUser.email));
    SessionStorageService.saveData("multimart_orders", orders);
    return orders;
  } else {
    dispatch(orderActions.getAllOrders(storedOrders));
    SessionStorageService.saveData("multimart_orders", storedOrders);
    return storedOrders;
  }
};
