import LoadingScreen from "@components/LoadingScreen";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const router = useRouter();

  return <div></div>;
};

Accounts.layout = ProfileLayout;
export default Accounts;
