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

const Tabs = [
  // { icon: <FaHome />, title: "Dashboard", href: "/admin", color: "primary" },
  {
    icon: <FaUserFriends />,
    title: "Users",
    href: "/admin",
    color: "primary",
  },
  {
    icon: <AiOutlineFundProjectionScreen />,
    title: "Projects",
    href: "/admin/projects",
    color: "green-500",
  },
  {
    icon: <FaRegHeart />,
    title: "Donation",
    href: "/admin/donation",
    color: "pink-400",
  },
  {
    icon: <BsGrid />,
    title: "Posts",
    href: "/admin/posts",
    color: "indigo-600",
  },
  {
    icon: <BiCommentDetail />,
    title: "Comments",
    href: "/admin/comments",
    color: "purple-500",
  },
  { icon: <FaPoll />, title: "Poll", href: "/admin/poll", color: "yellow-500" },
  {
    icon: <AiFillSetting />,
    title: "Settings",
    href: "/admin/settings",
    color: "red-500",
  },
];

const AdminLayout = ({ children }) => {
  const [user, userIsLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (!userIsLoading) {
      console.log("user loaded");
      if (!user) {
        console.log("no user");
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
              <a className="font-cursive text-2xl uppercase">
                <span className="lg:inline-block hidden">BUETian</span>{" "}
                <span className="bg-primary rounded px-2 py-1 pb-0 text-white inline-block">
                  89
                </span>
              </a>
            </Link>
          </div>
          <div className="px-2 text-gray-600 dark:text-adminTextDark">
            {Tabs.map((tab) => (
              <ActiveLink
                key={tab.title}
                activeClassName="text-black dark:text-white bg-primaryDark dark:bg-white bg-opacity-10"
                href={tab.href}
              >
                <a className="focus:outline-none rounded-md flex items-center justify-center lg:justify-start py-2 px-4 lg:pl-8 hover:bg-primaryDark dark:hover:bg-white hover:bg-opacity-10 mr-auto mb-2">
                  <i
                    className={`text-2xl text-${tab.color} dark:text-current lg:text-xl lg:mr-4 text-left`}
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
      </div>
    </div>
  );
};

export default AdminLayout;
