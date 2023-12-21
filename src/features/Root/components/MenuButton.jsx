import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Close from "../../../shared/components/Icons/Close";
import Menu from "../../../shared/components/Icons/Menu";

const MenuButton = ({ onClick, isOpen }) => {
  const [contentIsLoaded, setContentIsLoaded] = useState(false);

  useEffect(() => {
    setContentIsLoaded(true);
  }, []);
  return (
    contentIsLoaded &&
    createPortal(
      <div className="mobile__menu">
        <span onClick={onClick}>{isOpen ? <Close /> : <Menu />}</span>
      </div>,
      document.querySelector(".nav__icons")
    )
  );
};

export default MenuButton;
