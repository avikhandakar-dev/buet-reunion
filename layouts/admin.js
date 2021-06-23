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
  { icon: <FaHome />, title: "Dashboard", href: "/admin" },
  { icon: <FaRegHeart />, title: "Donation", href: "/admin/donation" },
  {
    icon: <AiOutlineFundProjectionScreen />,
    title: "Projects",
    href: "/admin/projects",
  },
  { icon: <BsGrid />, title: "Posts", href: "/admin/posts" },
  { icon: <BiCommentDetail />, title: "Comments", href: "/admin/comments" },
  { icon: <FaPoll />, title: "Poll", href: "/admin/poll" },
  { icon: <FaUserFriends />, title: "Users", href: "/admin/users" },
  { icon: <AiFillSetting />, title: "Settings", href: "/admin/settings" },
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
    <div className="flex w-screen h-screen bg-adminBgLight dark:bg-gray-800 p-2">
      <aside className="flex flex-col justify-between lg:w-60 py-6 lg:py-10 bg-white dark:bg-primaryDark rounded-r-3xl shadow-xl h-full overflow-y-auto flex-shrink-0">
        <div>
          <div className="flex justify-center flex-col items-center mb-5">
            <div className="p-1 border-2 border-gray-300 dark:border-gray-200 inline-block rounded-full mx-1 lg:mx-0">
              <div className="relative w-10 h-10 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    layout="fill"
                    objectFit="cover"
                    alt="Avatar"
                  />
                ) : (
                  <span className="w-full h-full flex justify-center items-center text-bold rounded-full border border-admin_lighter text-gray-700 text-lg">
                    <p className="font-bold uppercase text-2xl">
                      {user.displayName.substring(0, 2)}
                    </p>
                  </span>
                )}
              </div>
            </div>
            <div className="text-center mt-2 hidden lg:block">
              <p className="text-body font-semibold">{user.displayName}</p>
              <p className="text-body text-xs font-light">{user.email}</p>
            </div>
          </div>
          <div className="px-2 text-gray-600 dark:text-adminTextDark">
            {Tabs.map((tab) => (
              <ActiveLink
                key={tab.title}
                activeClassName="text-black dark:text-white bg-primaryDark dark:bg-white bg-opacity-10"
                href={tab.href}
              >
                <a className="focus:outline-none rounded-md flex items-center justify-center lg:justify-start py-2 px-4 lg:pl-8 hover:bg-primaryDark dark:hover:bg-white hover:bg-opacity-10 mr-auto mb-2">
                  <i className="text-2xl lg:text-xl lg:mr-4 text-left">
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
      <div className="flex-grow h-full overflow-y-auto py-6 lg:py-10 px-6 lg:px-10 lg:px-16">
        <div className="flex justify-end items-center bg-adminBgLight dark:bg-gray-800">
          <NIcon />
          <span className="text-xl ml-3 w-9 h-9 bg-gray-100 rounded-full flex justify-center items-center border-2 border-gray-600 text-gray-600">
            <BiHomeAlt />
          </span>
        </div>
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;