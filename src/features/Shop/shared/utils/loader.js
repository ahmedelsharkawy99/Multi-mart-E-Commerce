import { json } from "react-router-dom";

import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { productsActions } from "../../../../shared/store/slices/productsSlice/productsSlice";
import { fetchProducts } from "../../../../shared/store/slices/productsSlice/productsActions";

export const shopProductsLoader = async (dispatch) => {
  try {
    const prodcutsSession =
      SessionStorageService.getStoredData("multimart_products");
    if (prodcutsSession) {
      dispatch(productsActions.replaceProducts(prodcutsSession));
      dispatch(productsActions.filterProducts());
      return prodcutsSession;
    }

    const products = await dispatch(fetchProducts());
    dispatch(productsActions.filterProducts());
    SessionStorageService.saveData("multimart_products", products);
    return products;
  } catch (error) {
    json(
      { message: "Can not load products data. Please try again later." },
      { status: 500 }
    );
  }
};
