import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../shared/hooks/useAuth";

const LogRoutes = () => {
  const currentUser = useAuth();
  const { search } = useLocation();
  return currentUser ? <Navigate to={`${search.slice(1)}`} /> : <Outlet />;
};

export default LogRoutes;
