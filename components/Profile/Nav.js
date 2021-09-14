import { BsHeartFill } from "react-icons/bs";
import { FaUserEdit, FaPoll } from "react-icons/fa";
import ActiveLink from "@components/ActiveLink";

const ProfileNav = () => {
  const MenuItems = [
    {
      name: "Profile",
      icon: <FaUserEdit />,
      url: "/accounts",
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
    <div className="border-t border-gray-300 dark:border-gray-800 mt-10 flex justify-center bg-white dark:bg-black pb-4">
      {MenuItems.map((item) => (
        <ActiveLink
          activeClassName="!text-primary border-t border-primary"
          href={item.url}
        >
          <a className="uppercase mx-4 sm:mx-6 pt-4 text-gray-500 tracking-widest font-medium text-sm flex flex-col sm:flex-row justify-center items-center">
            <span className="sm:mr-2 mb-2 sm:mb-0">{item.icon}</span>
            {item.name}
          </a>
        </ActiveLink>
      ))}
    </div>
  );
};

export default ProfileNav;
