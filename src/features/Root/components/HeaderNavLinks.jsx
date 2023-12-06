import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { navLinks } from "../shared/utils/links";
import { sidebarMenu } from "../shared/utils/variants";
import useWindowSize from "../shared/hooks/useWIndowSize";

import MenuButton from "./MenuButton";

const HeaderNavLinks = () => {
  const { width } = useWindowSize();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenuIsOpen = () => setMenuIsOpen((prevState) => !prevState);

  const containerKey = width > 768 ? "normal" : "animation";
  const animation = {
    initial: false,
    animate: width > 768 ? "normal" : menuIsOpen ? "open" : "close",
    variants: sidebarMenu,
  };

  return (
    <>
      <AnimatePresence>
        <motion.div className={`navigation`} {...animation} key={containerKey}>
          <ul className="menu">
            {navLinks.map((navLink) => (
              <li className="nav__item" key={navLink.display}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav__active" : undefined
                  }
                  to={navLink.path}
                >
                  {navLink.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
      <MenuButton onClick={toggleMenuIsOpen} isOpen={menuIsOpen} />
    </>
  );
};

export default HeaderNavLinks;
