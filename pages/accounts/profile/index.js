import LoadingScreen from "@components/LoadingScreen";
import ProfileInfo from "@components/Profile/Info";
import AuthContext from "@lib/authContext";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useContext } from "react";
import { MdLocationOn } from "react-icons/md";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  if (userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="relative">
      <div className="-mt-4">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {user?.displayName || "Anonymous"}
          </p>
          <p className="text-sm text-center text-gray-400">{user?.email}</p>
          <div className="text-center flex items-center justify-center mt-2">
            <MdLocationOn />{" "}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {userData?.state || "Unknown"}, {userData.country || "Unknown"}
            </p>
          </div>

          {userData?.bio && (
            <div className="py-16 mx-auto max-w-3xl">
              <p>{userData.bio}</p>
            </div>
          )}

          <div className="flex justify-center items-center space-x-8 text-gray-700 dark:text-gray-400 flex-wrap">
            <p>{`Phone : ${userData.phone || "Unknown"}`}</p>
            <p>{`Department : ${userData.department || "Unknown"}`}</p>
            <p>{`Hall : ${userData.hall || "Unknown"}`}</p>
            <p>{`CBB : ${userData.CBB || "Unknown"}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Accounts.layout = ProfileLayout;
export default Accounts;
