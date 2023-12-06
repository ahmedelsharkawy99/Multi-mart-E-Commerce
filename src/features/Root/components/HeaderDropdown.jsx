import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useAuth from "../../../shared/hooks/useAuth";
import userIcon from "../../../assets/images/user-icon.png";
import { dropdownVariants } from "../shared/utils/variants";

const UserLoggedInMenu = lazy(() => import("./UserLoggedInMenu"));
const UserLoggedOutMenu = lazy(() => import("./UserLoggedOutMenu"));
const HeaderDropdown = () => {
  const currentUser = useAuth();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <div className="profile">
      <motion.img
        whileTap={{ scale: 1.2 }}
        alt={currentUser ? `${currentUser.displayName} pic` : "user pic"}
        onClick={() => setDropdownIsOpen((prevState) => !prevState)}
        srcSet={`${currentUser ? currentUser.imageUrl : userIcon} 320w,
                 ${currentUser ? currentUser.imageUrl : userIcon} 480w,
                 ${currentUser ? currentUser.imageUrl : userIcon} 800w`}
        sizes="30px"
        loading="lazy"
      />

      <AnimatePresence mode="wait">
        {dropdownIsOpen && (
          <motion.ul
            className={`profile__actions`}
            variants={dropdownVariants}
            initial="close"
            animate="open"
            exit="close"
          >
            <AnimatePresence>
              <Suspense fallback={null}>
                {currentUser ? <UserLoggedInMenu /> : <UserLoggedOutMenu />}
              </Suspense>
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderDropdown;
