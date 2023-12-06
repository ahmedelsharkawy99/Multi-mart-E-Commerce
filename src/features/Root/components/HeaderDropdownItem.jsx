import { motion } from "framer-motion";

import { dropdownItemVariants } from "../shared/utils/variants";

const HeaderDropdownItem = ({ children, className }) => {
  return (
    <motion.li variants={dropdownItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

export default HeaderDropdownItem;
