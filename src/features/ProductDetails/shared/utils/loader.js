import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { fetchProducts } from "../../../../shared/store/slices/productsSlice/productsActions";
import { productsActions } from "../../../../shared/store/slices/productsSlice/productsSlice";

const handleDispatch = (dispatch, id) => {
  dispatch(productsActions.getProductDetails(id));
  dispatch(productsActions.getRelatedProducts({ id }));
};

export const productDetailsLoader = async (dispatch, id) => {
  const prodcutsSession =
    SessionStorageService.getStoredData("multimart_products");

  dispatch(productsActions.replaceProducts(prodcutsSession));
  if (prodcutsSession) {
    handleDispatch(dispatch, id);
    return prodcutsSession;
  }

  const products = await dispatch(fetchProducts());
  handleDispatch(dispatch, id);
  SessionStorageService.saveData("multimart_products", products);
  return products;
};
