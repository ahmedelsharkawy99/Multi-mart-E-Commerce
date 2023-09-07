import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./header.css";
import useAuth from "../../hooks/useAuth";
import userIcon from "../../assets/images/user-icon.png";

import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import { userLogout } from "../../redux/slices/userSlice/userActions";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/cart",
    display: "Cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useAuth();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const stickyHeaderHandler = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("stciky__header");
      } else {
        headerRef.current?.classList.remove("stciky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderHandler();

    return () => window.removeEventListener("scroll", stickyHeaderHandler);
  }, []);

  const toggleDropdown = () =>
    dropdownRef.current.classList.toggle("show__profile-actions");

  const navigateToCart = () => navigate("/cart");

  const logoutHandler = async () => {
    try {
      await dispatch(userLogout());
      dropdownRef.current.classList.remove("show__profile-actions");
      toggleDropdown();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.header layout className={`header`} ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Logo />

            <div
              className={`navigation`}
              onClick={() => menuRef.current.classList.remove("active__menu")}
              ref={menuRef}
            >
              <ul className="menu">
                {navLinks.map((navLink, i) => (
                  <li className="nav__item" key={i}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav__active" : ""
                      }
                      to={navLink.path}
                    >
                      {navLink.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <motion.span
                  key={totalQuantity}
                  whileInView={{ rotate: "360deg" }}
                  animate={{
                    scale: 1.3,
                    transitionEnd: {
                      scale: 1,
                    },
                  }}
                  className="badge"
                >
                  {totalQuantity}
                </motion.span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.imageUrl : userIcon}
                  alt={
                    currentUser ? `${currentUser.displayName} pic` : "user pic"
                  }
                  onClick={() =>
                    dropdownRef.current.classList.toggle(
                      "show__profile-actions"
                    )
                  }
                />

                <motion.div
                  key={dropdownRef}
                  ref={dropdownRef}
                  className={`profile__actions`}
                  whileInView={{ opacity: 1, translateY: "0px" }}
                  initial={{ opacity: 0, translateY: "-20px" }}
                >
                  {currentUser ? (
                    <>
                      <Link
                        to="/orders-history"
                        className="text-light mb-2"
                        onClick={toggleDropdown}
                      >
                        Orders History
                      </Link>
                      <span className="text-danger" onClick={logoutHandler}>
                        Logout
                      </span>
                    </>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column text-light">
                      <Link to="/signup" onClick={toggleDropdown}>
                        Signup
                      </Link>
                      <Link to="/login" onClick={toggleDropdown}>
                        Login
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="mobile__menu">
                <span
                  onClick={() => menuRef.current.classList.add("active__menu")}
                >
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </motion.header>
  );
};

export default Header;
