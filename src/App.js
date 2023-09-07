import { useEffect } from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";
import { useDispatch } from "react-redux";
import { authState } from "./redux/slices/userSlice/userActions";
import { fetchProducts } from "./redux/slices/productsSlice/productsActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => await dispatch(authState());
    const getProducts = async () => await dispatch(fetchProducts());
    getProducts();
    getCurrentUser();
  }, [dispatch]);

  return <Layout />;
}

export default App;
