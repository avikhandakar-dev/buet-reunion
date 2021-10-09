import { useContext, useState, useEffect } from "react";
import AuthContext from "@lib/authContext";
import { FaUsers } from "react-icons/fa";
import { GetUsersStatus } from "@lib/healper";

const TotalUsersWidget = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const unsubs = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("/api/users", {
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { error, data } = await res.json();
      if (!error) {
        setMembers(data.users);
      }
      setIsLoading(false);
    };
    return unsubs();
  }, []);

  const { isAdmin, isPremium, isMember, isRegistered } =
    GetUsersStatus(members);

  return (
    <div className="w-full shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="uppercase text-gray-400 dark:text-gray-200 text-sm">
            Users
          </p>
          <p className="text-black dark:text-white text-2xl">
            {members.length}
          </p>
        </div>
        <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-yellow-500 rounded-full">
          <FaUsers />
        </div>
      </div>
      <div className="flex">
        <p className="text-gray-400 dark:text-gray-200 mr-3">
          Premium <span className="text-green-400">{isPremium.length}</span>
        </p>
        <p className="text-gray-400 dark:text-gray-200">
          Member <span className="text-green-400">{isMember.length}</span>
        </p>
      </div>
    </div>
  );
};

export default TotalUsersWidget;
