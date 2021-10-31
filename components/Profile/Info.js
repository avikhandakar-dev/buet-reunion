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
        <div className="text-center flex-1 lg:pt-8 flex justify-center space-x-12" />
        <div className="flex-1">
          <div className="relative mx-auto bg-sky -translate-y-20 flex-shrink-0 w-40 h-40 mb-3 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={user?.photoURL || "/img/avatar.svg"}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex-1 lg:pt-8 text-right -mt-16 mb-12 lg:mt-0 lg:mb-0">
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
