import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "react-toastify/dist/ReactToastify.css";
import store from "./shared/store/store.js";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
      deferLoading={true}
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
