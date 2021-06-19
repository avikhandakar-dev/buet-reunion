import { useEffect } from "react";
import Router from "next/router";
import AuthLayout from "layouts/auth";
import LoadingScreen from "@components/LoadingScreen";
import { auth } from "@lib/firebase";

const Logout = () => {
  useEffect(() => {
    auth.signOut();
    Router.push("/");
  }, []);
  return <LoadingScreen />;
};

export default Logout;
