export const cardInit = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 },
  },
};
export const menuCardInit = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 },
  },
};

export const pageInit = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
