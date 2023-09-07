import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Spinner } from "reactstrap";

import "./login.css";

import Helmet from "../../components/Helmet/Helmet";
import { userLogin } from "../../redux/slices/userSlice/userActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const type = visible ? "text" : "password";
  const icon = !visible ? "eye" : "eye-off";

  const changeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  const toggleVisibilty = () => setVisible((prevState) => !prevState);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(userLogin(formData));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Row className="my-5">
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Login</h3>
            <Form className="auth__from" onSubmit={submitHandler}>
              <FormGroup className="form__group">
                <input
                  required
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                />
              </FormGroup>

              <FormGroup className="form__group position-relative">
                <input
                  required
                  type={type}
                  id="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={changeHandler}
                />
                <span className="position-absolute" onClick={toggleVisibilty}>
                  <i className={`ri-${icon}-line`}></i>
                </span>
              </FormGroup>
              <button className="buy__btn auth__btn" disabled={isLoading}>
                {isLoading ? <Spinner size="sm">Loading...</Spinner> : "Login"}
              </button>
              <p>
                Don't have an account?{" "}
                <Link to="/signup">Create an account.</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Login;
