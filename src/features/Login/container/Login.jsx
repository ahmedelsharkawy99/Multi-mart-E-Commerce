import "../styles/login.css";

import Helmet from "../../../shared/components/Helmet/Helmet";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../../../shared/components/AuthLayout/AuthLayout";

const Login = () => {
  return (
    <Helmet title="Login">
      <AuthLayout title="Login">
        <LoginForm />
      </AuthLayout>
    </Helmet>
  );
};

export default Login;
