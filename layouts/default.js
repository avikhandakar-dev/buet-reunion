import AuthContext from "@lib/authContext";
import { GlobalContext } from "@lib/globalContext";
import React, { Fragment } from "react";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useRouter } from "next/router";

const DefaultLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const {
    redirectToProfile,
    setRedirectToProfile,
    userData,
    userDataIsLoading,
  } = useContext(GlobalContext);

  useEffect(() => {
    const unsubs = async () => {
      if (user) {
        if (!redirectToProfile) {
          if (!userDataIsLoading) {
            if (!userData.country || !userData.state || !userData.CBB) {
              toast.error("Please complete your profile!");
              router.push("/accounts");
              setRedirectToProfile(true);
            } else {
              setRedirectToProfile(true);
            }
          }
        }
      }
    };
    return unsubs();
  }, [userDataIsLoading, user]);
  return (
    <Fragment>
      <Nav />
      {children}
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
