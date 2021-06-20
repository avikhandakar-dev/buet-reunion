import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import AuthContext from "@lib/authContext";

const AuthLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const path = router.query["next"];
  const nextPath = path ? path : "/";

  useEffect(() => {
    if (user) {
      router.push(nextPath);
    }
  }, [user]);

  return <Fragment>{children}</Fragment>;
};

export default AuthLayout;
