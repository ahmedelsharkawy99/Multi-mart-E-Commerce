import { Navigate } from "react-router-dom";

import useAuth from "../shared/hooks/useAuth";

const RequireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const currentUser = useAuth();

    return currentUser ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
