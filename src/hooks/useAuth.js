import { useSelector } from "react-redux";

const useAuth = () => {
  const currentUser = useSelector((state) => state.user.user);
  return currentUser;
};

export default useAuth;
