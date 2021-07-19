import { createContext } from "react";
import { useState } from "react";
import { auth, createUserProfileDocument } from "./firebase";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  auth.onAuthStateChanged(async function (user) {
    if (user) {
      setUser(user);
      const userRef = await createUserProfileDocument(user);
    } else {
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
