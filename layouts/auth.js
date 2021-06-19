import { AuthContext } from "@lib/authContext";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthLayout = ({ children }) => {
  const { user, username } = useContext(AuthContext);
  const router = useRouter();
  const path = router.query["next"];
  const nextPath = path ? path : "/";
  useEffect(() => {
    if (user) {
      if (username) {
        toast.success("You are Already Logged in!");
        router.push(nextPath);
      } else {
        router.push("/accounts/edit");
      }
    }
  }, [user]);
  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
