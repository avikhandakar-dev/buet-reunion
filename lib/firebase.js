import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNEjFuPX6QovYk-S4taNV_ZjHMCisQDNQ",
  authDomain: "buetian89.firebaseapp.com",
  projectId: "buetian89",
  storageBucket: "buetian89.appspot.com",
  messagingSenderId: "197019219591",
  appId: "1:197019219591:web:7704a8c5592b0fdd42aa22",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
firebase.auth.Auth.Persistence.LOCAL;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const StoreUserData = (user) => {
  return firestore.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
  });
};

export const uploadImage = async ({ file, filePath }) => {
  const storageRef = storage.ref(filePath);
  try {
    const res = await storageRef.put(file);
    const imageURL = await res.ref.getDownloadURL();
    return imageURL;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const deleteImage = async (path) => {
  const storageRef = storage.ref(path);
  try {
    await storageRef.delete();
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export async function getUserWithEmail(email) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", email).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export default firebase;
