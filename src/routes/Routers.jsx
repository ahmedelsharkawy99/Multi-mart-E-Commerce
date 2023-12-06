import { lazy } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { authState } from "../features/Root/shared/utils/loader";

import LogRoutes from "./LogRoutes";
import Root from "../features/Root/container/Root";

const Home = lazy(() => import("../features/Home/container/Home"));
const Shop = lazy(() => import("../features/Shop/container/Shop"));
const ProductDetails = lazy(() =>
  import("../features/ProductDetails/container/ProductDetails")
);
const Cart = lazy(() => import("../features/Cart/container/Cart"));
const Checkout = lazy(() => import("../features/Checkout/container/Checkout"));
const PlaceOrder = lazy(() =>
  import("../features/PlaceOrder/container/PlaceOrder")
);
const Order = lazy(() => import("../features/Order/container/Order"));
const OrdersHistory = lazy(() =>
  import("../features/OrdersHistory/container/OrdersHistory")
);
const Login = lazy(() => import("../features/Login/container/Login"));
const Signup = lazy(() => import("../features/Signup/container/Signup"));

const Routers = () => {
  const dispatch = useDispatch();

  const globleRoutes = [
    {
      index: true,
      element: <Home />,
      async loader() {
        const { homeProductsLoader } = await import(
          "../features/Home/shared/utils/loader"
        );
        return homeProductsLoader(dispatch);
      },
    },
    {
      path: "/shop",
      element: <Shop />,
      async loader() {
        const { shopProductsLoader } = await import(
          "../features/Shop/shared/utils/loader"
        );
        return shopProductsLoader(dispatch);
      },
    },
    {
      path: "/shop/:id",
      element: <ProductDetails />,
      async loader({ params }) {
        const { productDetailsLoader } = await import(
          "../features/ProductDetails/shared/utils/loader"
        );
        return productDetailsLoader(dispatch, params.id);
      },
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ];

  const loggedInRoutes = [
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/place-order",
      element: <PlaceOrder />,
    },
    {
      path: "/orders/:id",
      element: <Order />,
      async loader({ params }) {
        const { OrderDetailsLoader } = await import(
          "../features/Order/shared/utils/loader"
        );
        return OrderDetailsLoader(dispatch, params.id);
      },
    },
    {
      path: "/orders",
      element: <OrdersHistory />,
      async loader() {
        const { getUserOrdersLoader } = await import(
          "../features/OrdersHistory/shared/utils/loader"
        );
        return getUserOrdersLoader(dispatch);
      },
    },
  ];

  const loggedOutRouts = [
    {
      path: "/",
      element: <LogRoutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ];

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: authState(dispatch),
      children: [...globleRoutes, ...loggedInRoutes, ...loggedOutRouts],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routers;
