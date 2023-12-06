const tabVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const tabAnimationProps = {
  variants: tabVariant,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};
