import Helmet from "../../../shared/components/Helmet/Helmet";
import AuthLayout from "../../../shared/components/AuthLayout/AuthLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <Helmet title="Signup">
      <AuthLayout title="Create Account">
        <SignupForm />
      </AuthLayout>
    </Helmet>
  );
};

export default Signup;
