import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const LogRoutes = () => {
  const currentUser = useAuth();
  const { search } = useLocation();
  return currentUser ? <Navigate to={`${search.slice(1)}`} /> : <Outlet />;
};

export default LogRoutes;
