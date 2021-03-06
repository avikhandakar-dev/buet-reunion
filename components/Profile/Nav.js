import { BsHeartFill } from "react-icons/bs";
import { FaUserEdit, FaPoll } from "react-icons/fa";
import ActiveLink from "@components/ActiveLink";
import Link from "next/link";

const ProfileNav = () => {
  const MenuItems = [
    {
      name: "Profile",
      icon: <FaUserEdit />,
      url: "/accounts/profile",
    },
    {
      name: "Donation",
      icon: <BsHeartFill />,
      url: "/accounts/donation",
    },
  ];
  return (
    <div className="fixed z-40 left-0 top-0 w-full sm:h-20 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-b border-gray-800">
      <div className="w-full px-16 h-full sm:flex justify-between items-center">
        <Link href="/">
          <a className="font-cursive pt-4 sm:pt-0 mx-4 text-xl flex items-center space-x-2 text-white justify-center">
            <span className="">
              <img src="/logo_wot_white.svg" className="w-10" />
            </span>
            <p className="mt-[6px] hidden md:block">
              BUETian <span className="text-primary">89</span> NA
            </p>
          </a>
        </Link>
        <div className="flex justify-center items-center pb-4 sm:pb-0">
          {MenuItems.map((item) => (
            <ActiveLink activeClassName="!text-yellow-500" href={item.url}>
              <a className="uppercase mx-4 sm:mx-6 pt-4 text-white tracking-widest font-semibold text-sm flex justify-center items-center">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </a>
            </ActiveLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
