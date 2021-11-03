import { FaUserFriends, FaHome, FaPoll, FaRegHeart } from "react-icons/fa";
import { AiFillSetting, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiCommentDetail, BiHomeAlt } from "react-icons/bi";
import { BsFillGrid1X2Fill, BsHeartFill, BsGrid } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "@components/LoadingScreen";
import { auth } from "@lib/firebase";
import ActiveLink from "@components/ActiveLink";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import NIcon from "@components/NIcon";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@lib/authContext";
import { IoIosImages } from "react-icons/io";

const Tabs = [
  // { icon: <FaHome />, title: "Dashboard", href: "/admin", color: "primary" },
  {
    icon: <FaUserFriends />,
    title: "Users",
    href: "/admin",
    color: "text-primary",
  },
  {
    icon: <AiOutlineFundProjectionScreen />,
    title: "Projects",
    href: "/admin/projects",
    color: "text-green-500",
  },
  {
    icon: <FaRegHeart />,
    title: "Donation",
    href: "/admin/donation",
    color: "text-pink-400",
  },
  {
    icon: <BsGrid />,
    title: "Posts",
    href: "/admin/posts",
    color: "text-indigo-600",
  },
  {
    icon: <IoIosImages />,
    title: "Media",
    href: "/admin/media",
    color: "text-pink-600",
  },
  // {
  //   icon: <BiCommentDetail />,
  //   title: "Comments",
  //   href: "/admin/comments",
  //   color: "text-purple-500",
  // },
  {
    icon: <FaPoll />,
    title: "Polls",
    href: "/admin/polls",
    color: "text-yellow-500",
  },
  {
    icon: <AiFillSetting />,
    title: "Settings",
    href: "/admin/settings",
    color: "text-red-500",
  },
];

const AdminLayout = ({ children }) => {
  const [user, userIsLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (!userIsLoading) {
      if (!user) {
        router.push({
          pathname: "/accounts/login",
          query: { next: "/admin" },
        });
      } else {
        const token = await user.getIdTokenResult();
        if (!!token.claims.admin) {
          setIsAdmin(true);
        } else {
          toast.error("You are not an admin!");
          router.push("/");
        }
      }
    }
  }, [userIsLoading]);

  if (!isAdmin) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex w-screen h-screen bg-adminBgLight dark:bg-gray-800">
      <aside className="flex flex-col justify-between lg:w-64 py-6 lg:py-10 bg-white dark:bg-primaryDark shadow-xl h-full overflow-y-auto flex-shrink-0">
        <div>
          <div className="flex justify-center flex-col items-center mb-8">
            <Link href="/">
              <a className="font-cursive text-xl uppercase flex flex-col items-center">
                <span className="block dark:hidden">
                  <img src="/logo_wot.svg" width={50} />
                </span>
                <span className="hidden dark:block">
                  <img src="/logo_wot_white.svg" width={50} />
                </span>
                <p className="mt-[6px] hidden lg:block">
                  Buetian <span className="text-primary">89</span> NA
                </p>
              </a>
            </Link>
          </div>
          <div className="px-2 text-gray-600 dark:text-adminTextDark">
            {Tabs.map((tab) => (
              <ActiveLink
                key={tab.title}
                activeClassName="text-black dark:text-white bg-primaryDark dark:bg-white bg-opacity-10 dark:bg-opacity-10"
                href={tab.href}
              >
                <a className="focus:outline-none rounded-md flex items-center justify-center lg:justify-start py-2 px-4 lg:pl-8 hover:bg-primaryDark dark:hover:bg-white dark:hover:hover:bg-opacity-10 hover:bg-opacity-10 mr-auto mb-2">
                  <i
                    className={`text-2xl ${tab.color} dark:text-current lg:text-xl lg:mr-4 text-left`}
                  >
                    {tab.icon}
                  </i>
                  <p className="text-left text-body hidden lg:block">
                    {tab.title}
                  </p>
                </a>
              </ActiveLink>
            ))}
          </div>
        </div>
        <div className="px-2">
          <Link href="/accounts/logout">
            <a className="inline-flex px-4 lg:pl-8 text-body justify-center items-center text-gray-600 dark:text-adminTextDark transition-colors duration-300 hover:text-primary dark:hover:text-white">
              <span className="lg:mr-3 text-2xl lg:text-xl">
                <GoSignOut />
              </span>
              <span className="hidden lg:block">Log out</span>
            </a>
          </Link>
        </div>
      </aside>
      <div className="flex-grow h-full overflow-y-auto">
        <div className="mx-auto relative">{children}</div>
        <div className="flex justify-between px-6 lg:px-10 py-4">
          <p>© 2021 Buetian 89</p>
          <div className="flex">
            <Link href="/">
              <a className="text-gray-600 hover:text-primary dark:text-gray-400 mr-8">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-gray-600 hover:text-primary dark:text-gray-400 mr-8">
                About
              </a>
            </Link>
            <Link href="/legal/terms">
              <a className="text-gray-600 hover:text-primary dark:text-gray-400 mr-8">
                Terms
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-600 hover:text-primary dark:text-gray-400">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
