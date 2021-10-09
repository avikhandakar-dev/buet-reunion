import LoadingScreen from "@components/LoadingScreen";
import UserInfoForm from "@components/Profile/UserInfoForm";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useContext, useEffect } from "react";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);

  if (userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="rounded px-4 pb-16">
      <UserInfoForm userData={userData} />
    </div>
  );
};

Accounts.layout = ProfileLayout;
export default Accounts;
