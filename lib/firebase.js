import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { getFileNameWithoutExt, resizeImage } from "@lib/healper";
import { nanoid } from "nanoid";

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
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.collection("users").doc(userAuth.uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user!", error.message);
    }
  }
  return userAuth;
};

export const uploadImage = async ({ file, folder, format }) => {
  if (!file || !folder || !format) return false;
  const random = nanoid();
  const fileName = getFileNameWithoutExt(file.name);
  const oriPath = `${folder}/${random}.${format.toLowerCase()}`;
  const thumbPath = `${folder}/thumb-${random}.${format.toLowerCase()}`;
  const loaderPath = `${folder}/loader-${random}.${format.toLowerCase()}`;

  const oriRef = storage.ref(oriPath);
  const thumbRef = storage.ref(thumbPath);
  const loaderRef = storage.ref(loaderPath);

  try {
    var oriBlob = await resizeImage({
      file: file,
      width: 1200,
      height: 1200,
      format: format,
      quality: 70,
    });
    var thumbBlob = await resizeImage({
      file: file,
      width: 300,
      height: 300,
      format: format,
      quality: 70,
    });
    var loaderBlob = await resizeImage({
      file: file,
      width: 8,
      height: 8,
      format: format,
      quality: 1,
    });
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    const oriSnapshot = await oriRef.put(oriBlob);
    const oriDownloadUrl = await oriSnapshot.ref.getDownloadURL();

    const thumbSnapshot = await thumbRef.put(thumbBlob);
    const thumbDownloadUrl = await thumbSnapshot.ref.getDownloadURL();

    const loaderSnapshot = await loaderRef.put(loaderBlob);
    const loaderDownloadUrl = await loaderSnapshot.ref.getDownloadURL();

    return {
      oriPath,
      oriDownloadUrl,
      thumbPath,
      thumbDownloadUrl,
      loaderPath,
      loaderDownloadUrl,
      fileName,
    };
  } catch (error) {
    console.log(err.message);
    return false;
  }
};

export const deleteImage = async (image) => {
  const oriRef = storage.ref(image.oriPath);
  const thumbRef = storage.ref(image.thumbPath);
  const loaderRef = storage.ref(image.loaderPath);
  try {
    await oriRef.delete();
    await thumbRef.delete();
    await loaderRef.delete();
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

export async function getUserWithUid(uid) {
  const res = await fetch("http://localhost:3000/api/users/get", {
    body: JSON.stringify({
      uid: uid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const { error, data } = await res.json();
  if (error) {
    return false;
  }
  return data;
}

export function firestoreToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    // updatedAt: data?.updatedAt.toMillis() || 0,
    ...(data.updatedAt && {
      updatedAt: data?.updatedAt.toMillis() || 0,
    }),
    ...(data.coverImage && {
      coverImage: {
        ...data.coverImage,
        createdAt: data.coverImage.createdAt.toMillis
          ? data.coverImage.createdAt.toMillis()
          : 0,
      },
    }),
  };
}

export default firebase;
