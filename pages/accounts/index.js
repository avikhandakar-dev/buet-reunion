import LoadingScreen from "@components/LoadingScreen";
import UserInfoForm from "@components/Profile/UserInfoForm";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);

  if (userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="border-2 rounded py-4 px-4 dark:border-gray-700 border-gray-200">
      <UserInfoForm userData={userData} />
    </div>
  );
};

Accounts.layout = ProfileLayout;
export default Accounts;
