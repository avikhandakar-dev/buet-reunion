import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import AuthContext from "@lib/authContext";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

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

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      {children}
    </motion.main>
  );
};

export default AuthLayout;
