import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { getAllOrdersHandler } from "../../../../shared/store/slices/orderSlice/orderActions";
import { authChangeState } from "../../../../shared/store/slices/userSlice/userActions";
import { fetchProducts } from "../../../../shared/store/slices/productsSlice/productsActions";

const useRefetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentUser = await dispatch(authChangeState());
      const products = await dispatch(fetchProducts());

      SessionStorageService.saveData("multimart_products", products);

      if (currentUser) {
        const orders = await dispatch(getAllOrdersHandler(currentUser.email));

        SessionStorageService.saveData("multimart_user", currentUser);
        SessionStorageService.saveData("multimart_orders", orders);
      } else {
        toast.warning("Your session has expired. Please login again.");

        SessionStorageService.removeStoredData("multimart_user");
        SessionStorageService.removeStoredData("multimart_orders");

        clearInterval(interval);
      }
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
};

export default useRefetch;
