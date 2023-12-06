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

export const getCollectionData = (collectionName) => {
  return new Promise((resolve, reject) => {
    const docRef = collection(db, collectionName);

    onSnapshot(
      docRef,
      (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve(data);
      },
      (error) => reject(error)
    );
  });
};

export const setUser = async (user, imageUrl) => {
  const docRef = doc(db, "users", user.email);
  const currentUser = await setDoc(docRef, {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoUrl: imageUrl,
    isAdmin: false,
  });

  console.log(currentUser);
};

export const getUser = async (userEmail) => {
  const docRef = doc(db, "users", userEmail);
  const user = await getDoc(docRef);
  return user.data();
};

export const setOrder = async (order) => {
  const docRef = collection(db, "orders");

  const doc = await addDoc(docRef, {
    ...order,
    createdAt: serverTimestamp(),
  });

  return doc;
};

export const getData = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const data = await getDoc(docRef);
  return {
    ...data.data(),
    id: data.id,
  };
};

export const getUserOrders = (collectionName, email) => {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, collectionName),
      where("userDetails.email", "==", email)
    );

    onSnapshot(
      q,
      (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), id: doc.id });
        });
        resolve(orders);
      },
      (error) => reject(error.message)
    );
  });
};

export const updateOrder = async (collectionName, id) => {
  const updatedOrder = doc(db, collectionName, id);

  const order = await updateDoc(updatedOrder, {
    isPaid: true,
    paidAt: serverTimestamp(),
  });

  return order;
};

export const addUserReview = async (collectionName, id, data) => {
  const productDoc = doc(db, collectionName, id);
  const updatedProduct = await updateDoc(productDoc, {
    reviews: [...data.reviews],
    avgRating: data.avgRating,
  });

  return updatedProduct;
};
