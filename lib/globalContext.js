import { createContext, useContext, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthContext from "./authContext";
import { firestore } from "./firebase";

export const GlobalContext = createContext(undefined);
const GlobalContextProvider = ({ children }) => {
  // const [username, setUsername] = useState(null);
  const { user } = useContext(AuthContext);
  const [userData = [], userDataIsLoading] = useDocumentData(
    firestore.doc(`users/${user?.uid}`)
  );

  return (
    <GlobalContext.Provider
      value={{
        userData,
        userDataIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
