import Link from "next/link";
import Image from "next/image";
import { BsFillGrid1X2Fill, BsHeartFill } from "react-icons/bs";
import { MdLockOpen } from "react-icons/md";
import { FaUserEdit, FaPoll } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect } from "react";
import { IoMdExit } from "react-icons/io";
import AuthContext from "@lib/authContext";
import { GlobalContext } from "@lib/globalContext";
import { RiAdminFill } from "react-icons/ri";

const AuthIcon = () => {
  const { user } = useContext(AuthContext);
  const { userData } = useContext(GlobalContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubs = async () => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (!!idTokenResult.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };
    return unsubs();
  }, [user]);

  const MenuItems = [
    {
      name: "Profile",
      icon: <FaUserEdit />,
      url: "/accounts/profile",
    },
    {
      name: "My Donation",
      icon: <BsHeartFill />,
      url: "/accounts/donation",
    },
    {
      name: "Polls",
      icon: <FaPoll />,
      url: "/accounts/poll",
    },
    {
      name: "Log Out",
      icon: <IoMdExit />,
      url: "/accounts/logout",
    },
  ];
  return user ? (
    <Menu as="div" className="relative inline-block text-left mt-1">
      <Menu.Button className="mr-5 border-2 outline-none focus:outline-none border-gray-200 dark:border-gray-600 relative rounded-full overflow-hidden w-11 h-11">
        <a>
          <Image
            src={user.photoURL || "/img/avatar.svg"}
            width={44}
            height={44}
            objectFit="cover"
          />
        </a>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-2 right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {MenuItems.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <Link href={item.url}>
                  <a
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <span className="mr-2" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
          {isAdmin && (
            <Menu.Item>
              {({ active }) => (
                <Link href="/admin">
                  <a
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <span className="mr-2" aria-hidden="true">
                      <RiAdminFill />
                    </span>
                    Admin Panel
                  </a>
                </Link>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <span className="mr-5">
      <Link href="/accounts/login">
        <a className="transition duration-200 hover:text-primary flex justify-center items-center">
          <span className="mr-2">
            <MdLockOpen />
          </span>{" "}
          Login
        </a>
      </Link>
    </span>
  );
};

export default AuthIcon;
