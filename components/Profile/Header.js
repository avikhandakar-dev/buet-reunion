import ActiveLink from "@components/ActiveLink";
import { AuthContext } from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";
import { BsFillGrid1X2Fill, BsHeartFill } from "react-icons/bs";
import { FaUserEdit, FaPoll } from "react-icons/fa";

const ProfileHeader = () => {
  const { user, username, userdata } = useContext(AuthContext);
  const MenuItems = [
    {
      name: "Posts",
      icon: <BsFillGrid1X2Fill />,
      url: `/${username || "accounts"}`,
    },
    {
      name: "Donation",
      icon: <BsHeartFill />,
      url: `/${username + "/donation" || "accounts"}`,
    },
    {
      name: "Poll",
      icon: <FaPoll />,
      url: `/${username + "/poll" || "accounts"}`,
    },
    {
      name: "Profile",
      icon: <FaUserEdit />,
      url: "/accounts/edit",
    },
  ];
  return (
    <div className="mt-12">
      <div className="flex items-center flex-col">
        <div className="relative flex-shrink-0 w-28 h-28 mb-3 rounded-full overflow-hidden">
          <Image
            src={user?.photoURL || "/img/avatar.svg"}
            width="112"
            height="112"
            objectFit="cover"
          />
        </div>
        <div className="">
          <div>
            <p className="text-2xl md:text-3xl">
              {user?.displayName || "Anonymous"}
            </p>
            <p className="text-sm text-center text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 mt-10 flex justify-center">
        {MenuItems.map((item) => (
          <ActiveLink
            activeClassName="text-primary border-t border-primary"
            href={item.url}
          >
            <a className="uppercase mx-6 pt-4 text-gray-500 tracking-widest font-medium text-sm flex justify-center items-center">
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </a>
          </ActiveLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
