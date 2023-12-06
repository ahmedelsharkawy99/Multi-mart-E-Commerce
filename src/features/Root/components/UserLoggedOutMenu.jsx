import { Link } from "react-router-dom";
import HeaderDropdownItem from "./HeaderDropdownItem";

const UserLoggedOutMenu = () => {
  return (
    <>
      <HeaderDropdownItem className="text-light">
        <Link to="/signup">Signup</Link>
      </HeaderDropdownItem>
      <HeaderDropdownItem className="text-light">
        <Link to="/login">Login</Link>
      </HeaderDropdownItem>
    </>
  );
};

export default UserLoggedOutMenu;
