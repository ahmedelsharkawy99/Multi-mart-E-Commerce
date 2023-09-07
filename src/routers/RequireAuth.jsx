import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.user.user);

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
