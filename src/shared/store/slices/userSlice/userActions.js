import { toast } from "react-toastify";

import userPic from "../../../../assets/images/user-icon.png";
import { userActions } from "./userSlice";
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from "../../../services/handlers/auth";
import { getUser, setUser } from "../../../services/handlers/firestore";
import { uploadImage } from "../../../services/handlers/storage";
import { userImagePlaceholders } from "../../../utils/helpers";

export const userLogin = (data) => {
  return async (dispatch) => {
    const currentUser = await getUser(data.email);
    if (!currentUser) {
      throw new Error("Couldn't login. Please check your email and password.");
    }
    if (currentUser.isAdmin) {
      throw new Error("The user have no permissions to login");
    }

    const user = await login(data);
    if (!user) return;
    dispatch(userActions.setLog(user));
    toast.success(`Welcome ${user.displayName}`);
    return user;
  };
};

export const userSignup = (data, setProgress) => {
  return async (dispatch) => {
    if (!data.file) {
      const imageFile = await userImagePlaceholders(userPic);
      data.file = imageFile;
      console.log(data.file);
    }

    const downloadUrl = await uploadImage(
      `images/${Date.now() + data.username}`,
      data,
      setProgress
    );
    const user = await signup(data, downloadUrl);
    await setUser(user, downloadUrl);

    dispatch(userActions.setLog(user));
    toast.success("Account Created Successfully");

    return user;
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    await logout();
    dispatch(userActions.setLog(null));
    toast.success(`Logged out successfully`);
  };
};

export const authChangeState = () => {
  return async (dispatch) => {
    const user = await getCurrentUser();
    dispatch(userActions.setLog(user));
    return user;
  };
};
