import LoadingScreen from "@components/LoadingScreen";
import { AuthContext } from "@lib/authContext";
import ProfileLayout from "layouts/profile";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Accounts = () => {
  const { username } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (username) {
      router.push(`/${username}`);
    }
  }, [username]);
  return <LoadingScreen />;
};

Accounts.layout = ProfileLayout;
export default Accounts;
