import { useState } from "react";
import { firestore } from "./firebase";
import { nanoid } from "nanoid";

const addCollection = (collection) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // add a new document
  const addDoc = async (doc, id = nanoid(15)) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await firestore.collection(collection).doc(id).set(doc);
      setIsPending(false);
      return true;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { error, addDoc, isPending };
};

export default addCollection;
