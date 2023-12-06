import { auth } from "../firebase.config";
import {
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getUser } from "./firestore";
import { toast } from "react-toastify";

export const signup = async (data, imageUrl) => {
  try {
    const userCredentail = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredentail.user;
    await updateProfile(user, {
      displayName: data.username,
      photoURL: imageUrl,
      isAdmin: false,
    });
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (data) => {
  {
    try {
      const userCredentail = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentail.user;
      const userDb = await getUser(user.email);
      if (!userDb) {
        await auth.currentUser.delete();
        throw new Error(
          "User have been deleted by admin. Please contact with support to solve the problem."
        );
      }
      return user;
    } catch (error) {
      toast.error(error.message);
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return resolve(null);
      const userDb = await getUser(user.email);
      if (userDb.isAdmin) throw new Error("User have no permissions to access");
      resolve(user);
    });
  });
};
