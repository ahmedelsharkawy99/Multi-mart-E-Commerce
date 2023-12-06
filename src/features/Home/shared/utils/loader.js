import { json } from "react-router-dom";

import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { getCollectionData } from "../../../../shared/services/handlers/firestore";
import { productsActions } from "../../../../shared/store/slices/productsSlice/productsSlice";

export const homeProductsLoader = async (dispatch) => {
  try {
    const productsSession =
      SessionStorageService.getStoredData("multimart_products");

    if (productsSession) {
      dispatch(productsActions.replaceProducts(productsSession));
      return productsSession;
    }

    const products = await getCollectionData("products");

    dispatch(productsActions.replaceProducts(products));
    SessionStorageService.saveData("multimart_products", products);
    return products;
  } catch (error) {
    json(
      { message: "Can not load products data. Please try again later." },
      { status: 500 }
    );
  }
};
