import { db } from "../firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { formatDate } from "../util/helpers";

export const getCollectionData = (collectionName) => {
  return new Promise(async (resolve) => {
    try {
      const docRef = collection(db, collectionName);

      await onSnapshot(docRef, (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve(data);
      });
    } catch (error) {
      throw error;
    }
  });
};

export const setUser = async (user, imageUrl) => {
  try {
    const docRef = doc(db, "users", user.email);
    await setDoc(docRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: imageUrl,
      isAdmin: false,
    });
  } catch (error) {
    throw error;
  }
};

export const getUser = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "users", userEmail);
      const user = await getDoc(docRef);
      resolve(user.data());
    } catch (error) {
      reject(error.message);
    }
  });
};

export const setOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = collection(db, "orders");

      const doc = await addDoc(docRef, {
        ...order,
        createdAt: serverTimestamp(),
      });
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
};

export const getData = (collectionName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, collectionName, id);
      const data = await getDoc(docRef);
      resolve({
        ...data.data(),
        id: data.id,
        paidAt: formatDate(data.data().paidAt.seconds),
        deliveredAt: formatDate(data.data().deliveredAt.seconds),
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

export const getUserOrders = (collectionName, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(db, collectionName),
        where("userDetails.email", "==", email)
      );

      onSnapshot(q, (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
        });
        resolve(orders);
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

export const updateOrder = (collectionName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedOrder = doc(db, collectionName, id);

      const order = await updateDoc(updatedOrder, {
        isPaid: true,
        paidAt: serverTimestamp(),
      });

      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};
