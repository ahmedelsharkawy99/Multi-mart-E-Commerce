import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";

import SessionStorageService from "../../../shared/storage/sessionStorage";
import { userLogin } from "../../../shared/store/slices/userSlice/userActions";

import Show from "../../../shared/components/Icons/Show";
import Hide from "../../../shared/components/Icons/Hide";
import Spinner from "../../../shared/components/Spinner/Spinner";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const type = visible ? "text" : "password";
  const icon = !visible ? Show : Hide;

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
      const user = await dispatch(userLogin(formData));
      SessionStorageService.saveData("multimart_user", user ?? "");
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
        id="email"
        type="email"
        value={formData.email}
        onChange={changeHandler}
        placeholder="Enter your email"
      />

      <CustomInput
        containerClass="position-relative"
        icon={icon}
        onIconClick={toggleVisibilty}
        required
        type={type}
        id="password"
        value={formData.password}
        placeholder="Enter your password"
        onChange={changeHandler}
      />
      <button className="buy__btn auth__btn" disabled={isLoading}>
        {isLoading ? <Spinner /> : "Login"}
      </button>
      <p>
        Don&apos;t have an account? <Link to="/signup">Create an account.</Link>
      </p>
    </Form>
  );
};

export default LoginForm;
