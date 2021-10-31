import LoadingScreen from "@components/LoadingScreen";
import AuthContext from "@lib/authContext";
import { GlobalContext } from "@lib/globalContext";
import ProfileLayout from "layouts/profile";
import { useContext } from "react";
import { FiMapPin, FiSmartphone } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { VscSymbolClass } from "react-icons/vsc";

const Accounts = () => {
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  if (userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="relative">
      <div className="-mt-4 lg:-mt-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {user?.displayName || "Anonymous"}
          </p>
          <p className="text-sm text-center text-gray-400">{user?.email}</p>
          {userData?.bio && (
            <div className="py-8 mx-auto max-w-3xl">
              <p>{userData.bio}</p>
            </div>
          )}

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 dark:text-gray-400 py-8">
            <div className="shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
              <div className="flex justify-between space-x-8">
                <div className="text-left">
                  <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                    Location
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {userData?.state || "Unknown"},{" "}
                    {userData.country || "Unknown"}
                  </p>
                </div>
                <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-pink-500 rounded-full">
                  <FiMapPin />
                </div>
              </div>
            </div>
            <div className="shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
              <div className="flex justify-between space-x-8">
                <div className="text-left">
                  <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                    Phone
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {userData.phone || "Unknown"}
                  </p>
                </div>
                <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-yellow-500 rounded-full">
                  <FiSmartphone />
                </div>
              </div>
            </div>
            <div className="shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
              <div className="flex justify-between space-x-8">
                <div className="text-left">
                  <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                    Department
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {userData.department || "Unknown"}
                  </p>
                </div>
                <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-sky rounded-full">
                  <VscSymbolClass />
                </div>
              </div>
            </div>
            <div className="shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
              <div className="flex justify-between space-x-8">
                <div className="text-left">
                  <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                    Class Begins
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {userData.CBB || "Unknown"}
                  </p>
                </div>
                <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-indigo-500 rounded-full">
                  <AiTwotoneCalendar />
                </div>
              </div>
            </div>
            <div className="shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
              <div className="flex justify-between space-x-8">
                <div className="text-left">
                  <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                    Hall
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {userData.hall || "Unknown"}
                  </p>
                </div>
                <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-green-500 rounded-full">
                  <BsBuilding />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Accounts.layout = ProfileLayout;
export default Accounts;
