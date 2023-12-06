import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { userLogout } from "../../../shared/store/slices/userSlice/userActions";

import HeaderDropdownItem from "./HeaderDropdownItem";
import SessionStorageService from "../../../shared/storage/sessionStorage";

const UserLoggedInMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      SessionStorageService.removeStoredData("multimart_user");
      SessionStorageService.removeStoredData("multimart_orders");
      await dispatch(userLogout());
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <HeaderDropdownItem>
        <Link to="/orders" className="text-light mb-2">
          Orders History
        </Link>
      </HeaderDropdownItem>
      <HeaderDropdownItem>
        <span className="text-danger" onClick={logoutHandler}>
          Logout
        </span>
      </HeaderDropdownItem>
    </>
  );
};

export default UserLoggedInMenu;
