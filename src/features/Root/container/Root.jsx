import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useRefetch from "../shared/hooks/useRefetch";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LgSpinner from "../components/LgSpinner";

const Root = () => {
  useRefetch();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="dark"
      />
      <Header />
      <main>
        <Suspense fallback={<LgSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Root;
