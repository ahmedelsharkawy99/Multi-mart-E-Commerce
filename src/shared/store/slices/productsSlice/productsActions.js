import { toast } from "react-toastify";
import { productsActions } from "./productsSlice";
import {
  addUserReview,
  getCollectionData,
} from "../../../services/handlers/firestore";
import SessionStorageService from "../../../storage/sessionStorage";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = await getCollectionData("products");
      dispatch(productsActions.replaceProducts(products));
      return products;
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const addReview = (id, data) => {
  return async (dispatch) => {
    try {
      await addUserReview("products", id, data);

      const storedProducts =
        SessionStorageService.getStoredData("multimart_products");

      const existingProductIndex = storedProducts.findIndex(
        (product) => product.id === id
      );

      storedProducts[existingProductIndex] = {
        ...storedProducts[existingProductIndex],
        reviews: [...data.reviews],
        avgRating: data.avgRating,
      };

      SessionStorageService.saveData("multimart_products", storedProducts);

      dispatch(productsActions.addReview(data));
    } catch (error) {
      toast.error(error.message);
    }
  };
};
