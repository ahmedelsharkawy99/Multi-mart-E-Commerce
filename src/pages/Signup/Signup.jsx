import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Progress } from "reactstrap";

import Helmet from "../../components/Helmet/Helmet";
import { userSignup } from "../../redux/slices/userSlice/userActions";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    file: null,
  });

  const type = visible ? "text" : "password";
  const icon = !visible ? "eye" : "eye-off";

  const changeHandler = (e) => {
    if (e.target.id === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target?.files[0],
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const toggleVisibilty = () => setVisible((prevState) => !prevState);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(userSignup(formData, setProgress));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <Container>
        <Row className="my-5">
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Signup</h3>
            <Form className="auth__from" onSubmit={submitHandler}>
              <FormGroup className="form__group">
                <input
                  required
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={changeHandler}
                  placeholder="Enter your username"
                />
              </FormGroup>

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

              <FormGroup className="form__group">
                <input type="file" id="file" onChange={changeHandler} />
              </FormGroup>

              {isLoading && (
                <FormGroup className="form__group">
                  <Progress animated value={progress}>
                    {progress}%
                  </Progress>
                </FormGroup>
              )}

              <button type="submit" className="buy__btn auth__btn">
                Create an account
              </button>
              <p>
                Alerady have an account? <Link to="/login">Login.</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Signup;
