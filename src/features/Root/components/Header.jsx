import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "../shared/styles/header.css";

import Logo from "./Logo";
import HeaderDropdown from "./HeaderDropdown";
import HeaderNavLinks from "./HeaderNavLinks";
import useAnimateStickyHeader from "../shared/hooks/useAnimateStickyHeader";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { headerTop, headerPostion } = useAnimateStickyHeader();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const navigateToCart = () => navigate("/cart");

  return (
    <motion.header
      className={`header`}
      style={{ top: headerTop, position: headerPostion }}
    >
      <article className="container">
        <div className="nav__wrapper">
          <Logo />
          <HeaderNavLinks key={pathname} />
          <div className="nav__icons">
            <span className="cart__icon" onClick={navigateToCart}>
              <i className="ri-shopping-bag-line"></i>
              <motion.span
                key={totalQuantity}
                whileInView={{ rotate: "360deg" }}
                animate={{
                  scale: [1, 1.3, 1],
                }}
                className="badge"
              >
                {totalQuantity}
              </motion.span>
            </span>

            <HeaderDropdown key={pathname} />
          </div>
        </div>
      </article>
    </motion.header>
  );
};

export default Header;
