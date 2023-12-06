import { motion } from "framer-motion";

import { tabAnimationProps } from "../shared/utils/variants";

const DescriptionTab = ({ description }) => {
  return (
    <motion.div {...tabAnimationProps} className="tap__content mt-5">
      <p>{description}</p>
    </motion.div>
  );
};

export default DescriptionTab;
