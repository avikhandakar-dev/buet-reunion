import { createContext, useContext, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthContext from "./authContext";
import { firestore } from "./firebase";

export const GlobalContext = createContext(undefined);
const GlobalContextProvider = ({ children }) => {
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const { user } = useContext(AuthContext);
  const [userData = [], userDataIsLoading] = useDocumentData(
    firestore.doc(`users/${user?.uid}`)
  );
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        userData,
        userDataIsLoading,
        redirectToProfile,
        setRedirectToProfile,
        showMobileNav,
        setShowMobileNav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
