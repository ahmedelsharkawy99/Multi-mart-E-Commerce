import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getUser } from "./firestore";

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
    throw error;
  }
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
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
        reject("User have been deleted by admin. Please signup again.");
      }
      resolve(user);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const userDb = await getUser(user.email);
      if (userDb.isAdmin) throw new Error("User have no permissions to access");
      resolve(user);
    });
  });
};
