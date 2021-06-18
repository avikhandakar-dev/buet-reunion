import { useContext, useEffect } from "react";
import Router from "next/router";
import AuthLayout from "../../layouts/auth";
import { auth } from "../../lib/firebase";
import AuthContext from "../../lib/authContext";
import LoadingScreen from "../../components/LoadingScreen";

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    auth.signOut();
    setUser(undefined);
    Router.push("/");
  }, []);
  return <LoadingScreen />;
};

Logout.layout = AuthLayout;
export default Logout;
