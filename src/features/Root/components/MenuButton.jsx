import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MenuButton = ({ onClick, isOpen }) => {
  const [contentIsLoaded, setContentIsLoaded] = useState(false);

  useEffect(() => {
    setContentIsLoaded(true);
  }, []);
  return (
    contentIsLoaded &&
    createPortal(
      <div className="mobile__menu">
        <span onClick={onClick}>
          {isOpen ? (
            <i className="ri-close-line"></i>
          ) : (
            <i className="ri-menu-line"></i>
          )}
        </span>
      </div>,
      document.querySelector(".nav__icons")
    )
  );
};

export default MenuButton;
