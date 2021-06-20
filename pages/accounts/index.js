import LoadingScreen from "@components/LoadingScreen";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    if (!userDataIsLoading) {
      if (userData?.username) {
        router.push(`/${username}`);
      } else {
        router.push("/");
      }
    }
  }, [userData]);
  return <LoadingScreen />;
};

Accounts.layout = ProfileLayout;
export default Accounts;
