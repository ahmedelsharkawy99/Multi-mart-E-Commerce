import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";

import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import { userSignup } from "../../../shared/store/slices/userSlice/userActions";
import SessionStorageService from "../../../shared/storage/sessionStorage";

const SignupForm = () => {
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
      const user = await dispatch(userSignup(formData, setProgress));
      SessionStorageService.saveData("multimart_user", user);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="auth__from" onSubmit={submitHandler}>
      <CustomInput
        required
        id="username"
        type="text"
        value={formData.username}
        onChange={changeHandler}
        placeholder="Enter your username"
      />

      <CustomInput
        required
        id="email"
        type="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder="Enter your email"
      />

      <CustomInput
        containerClass="position-relative"
        icon={`ri-${icon}-line`}
        onIconClick={toggleVisibilty}
        required
        type={type}
        id="password"
        value={formData.password}
        placeholder="Enter your password"
        onChange={changeHandler}
      />

      <CustomInput type="file" id="file" onChange={changeHandler} />

      {isLoading && (
        <div className="form__group">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-label="Animated progress"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="buy__btn auth__btn">
        Create an account
      </button>
      <p>
        Alerady have an account? <Link to="/login">Login.</Link>
      </p>
    </Form>
  );
};

export default SignupForm;
