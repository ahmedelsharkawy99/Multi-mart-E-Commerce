import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import LogRoutes from "./LogRoutes";
import { Spinner } from "reactstrap";

import Home from "../pages/Home/Home";
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Order = lazy(() => import("../pages/Order/Order"));
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const PlaceOrder = lazy(() => import("../pages/PlaceOrder/PlaceOrder"));
const OrdersHistory = lazy(() =>
  import("../pages/OrdersHistory/OrdersHistory")
);
const ProductDetails = lazy(() =>
  import("../pages/ProductDetails/ProductDetails")
);
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/shop"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop/:id"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <Order />
          </Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <Checkout />
          </Suspense>
        }
      />
      <Route
        path="/place-order"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <PlaceOrder />
          </Suspense>
        }
      />
      <Route
        path="/orders-history"
        element={
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              </div>
            }
          >
            <OrdersHistory />
          </Suspense>
        }
      />
      <Route path="/*" element={<LogRoutes />}>
        <Route
          path="login"
          element={
            <Suspense
              fallback={
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense
              fallback={
                <Spinner
                  style={{
                    width: "5rem",
                    height: "5rem",
                  }}
                >
                  Loading...
                </Spinner>
              }
            >
              <Signup />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routers;
