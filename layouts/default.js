import AuthContext from "@lib/authContext";
import { GlobalContext } from "@lib/globalContext";
import React, { Fragment } from "react";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import MobileNav from "@components/MobileNav";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

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
          if (!userDataIsLoading && userData) {
            if (
              !userData.country ||
              !userData.CBB ||
              !userData.hall ||
              !userData.phone
            ) {
              toast.error("Please complete your profile!");
              router.push("/accounts/profile/edit");
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
      <MobileNav />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
      >
        {children}
      </motion.main>
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
