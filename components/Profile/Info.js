import AuthContext from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";
import { BsHeartFill } from "react-icons/bs";

const ProfileInfo = ({ userData }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full">
      <div className="relative bg-sky mx-auto flex-shrink-0 w-40 h-40 mb-3 rounded-full overflow-hidden border-4 border-white">
        <Image
          src={user?.photoURL || "/img/avatar.svg"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="">
        <div className="text-center">
          <p className="text-xl">{user?.displayName || "Anonymous"}</p>
          <p className="text-sm text-center text-gray-400">{user?.email}</p>
        </div>
        <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-700 my-6" />
        <div className="flex justify-between items-center">
          <div className="text-center leading-tight px-4 flex-1 ">
            <p className="font-semibold flex items-center justify-center text-5xl">
              <BsHeartFill className="mr-2 text-red-500" />
              {userData.totalDonation || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
