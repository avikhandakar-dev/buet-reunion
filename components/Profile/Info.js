import AuthContext from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

const ProfileInfo = ({ userData }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full block relative">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center">
        <div className="text-center flex-1 pt-8 flex justify-center space-x-12">
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">
              <span className="text-sm align-top">$</span>
              {userData.totalDonation || 0}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Donation</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">{userData.totalPolls || 0}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Polls</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">{userData.totalComments || 0}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Comments</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto bg-sky -translate-y-20 flex-shrink-0 w-40 h-40 mb-3 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={user?.photoURL || "/img/avatar.svg"}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex-1 pt-8 text-right">
          <Link href="/accounts/profile/edit">
            <a className="flex justify-center items-center text-primary duration-300 hover:text-yellow-500">
              <MdEdit className="" />
              <p className="ml-1 font-semibold">Edit</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
