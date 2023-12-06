import { useScroll, useTransform } from "framer-motion";

const useAnimateStickyHeader = () => {
  const { scrollY } = useScroll();

  const headerTop = useTransform(scrollY, [0, 250, 300, 600], [0, -100, 0, 0]);
  const headerPostion = useTransform(
    scrollY,
    [0, 250, 300, 500],
    ["relative", "relative", "sticky", "sticky"]
  );
  return { headerTop, headerPostion };
};

export default useAnimateStickyHeader;
