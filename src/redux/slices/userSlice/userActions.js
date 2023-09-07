import { toast } from "react-toastify";

import userPic from "../../../assets/images/user-icon.png";
import { userActions } from "./userSlice";
import { getCurrentUser, login, logout, signup } from "../../../handlers/auth";
import { getUser, setUser } from "../../../handlers/firestore";
import { uploadImage } from "../../../handlers/storage";
import { userImagePlaceholders } from "../../../util/helpers";

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const currentUser = await getUser(data.email);
      if (currentUser.isAdmin) {
        throw new Error("The user have no permissions to login");
      }

      const user = await login(data);
      dispatch(userActions.setLog(user));
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      throw error;
    }
  };
};

export const userSignup = (data, setProgress) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      await logout();
      dispatch(userActions.setLog(null));
      toast.success(`Logged out successfully`);
    } catch (error) {
      throw error;
    }
  };
};

export const authState = () => {
  return async (dispatch) => {
    try {
      const user = await getCurrentUser();
      dispatch(userActions.setLog(user));
    } catch (error) {
      toast.error(error.message);
    }
  };
};
