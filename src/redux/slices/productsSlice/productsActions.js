import { toast } from "react-toastify";
import { getCollectionData } from "../../../handlers/firestore";
import { productsActions } from "./productsSlice";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = await getCollectionData("products");
      dispatch(productsActions.replaceProducts(products));
    } catch (error) {
      toast.error(error.message);
    }
  };
};
