import { createContext } from "react";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
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
