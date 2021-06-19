import { auth, firestore } from "@lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
        setUserdata(doc.data());
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, userdata };
};

export default useUserData;
