import { BsHeartFill } from "react-icons/bs";
import { FaUserEdit, FaPoll } from "react-icons/fa";
import ActiveLink from "@components/ActiveLink";

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
    {
      name: "Poll",
      icon: <FaPoll />,
      url: "/accounts/poll",
    },
  ];
  return (
    <div className=" absolute z-30 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-white">Logo</p>
        <div className="flex">
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
