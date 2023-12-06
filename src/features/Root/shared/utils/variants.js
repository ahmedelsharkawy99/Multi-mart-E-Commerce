export const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },

  close: {
    opacity: 0,
    y: -30,
    transition: { staggerChildren: 0.1 },
  },
};

export const dropdownItemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },

  close: {
    opacity: 0,
    y: -40,
  },
};

export const sidebarMenu = {
  open: {
    display: "block",
    top: 60,
    clipPath: "circle(138.6% at 98% 2%)",
    transition: { duration: 0.4 },
  },
  close: {
    clipPath: "circle(2.6% at 98% 2%)",
    top: -30,
    transition: { duration: 0.4 },

    transitionEnd: {
      display: "none",
    },
  },
};
