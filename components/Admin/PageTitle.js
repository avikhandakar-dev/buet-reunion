import Avatar from "@components/Avatar";
import AuthContext from "@lib/authContext";
import { Fragment, useContext, useEffect, useState } from "react";
import useMediaQuery from "@lib/hooks/useMediaQuery";
import { HiMenuAlt2 } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";

const AdminPageTitle = ({ title, children, bgStyle }) => {
  const { user } = useContext(AuthContext);
  const [showAdimnSidebar, setShowAdminSidebar] = useState(false);
  const isSm = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const unsubs = async () => {
      if (!isSm) {
        setShowAdminSidebar(false);
      }
    };
    return unsubs();
  }, [isSm]);
  return (
    <Fragment>
      <AdminSidebar
        isOpen={showAdimnSidebar}
        closeModal={() => setShowAdminSidebar(false)}
      />
      <header className="absolute top-0 left-auto right-0 w-full bg-transparent">
        <div className="h-16  px-6 lg:px-10 flex justify-between items-center">
          <div className="flex gap-2 items-center text-lg text-white font-medium uppercase">
            <a
              onClick={() => {
                setShowAdminSidebar(true);
              }}
              className="sm:hidden cursor-pointer"
            >
              <HiMenuAlt2 />
            </a>
            <h1>{title || "Admin"}</h1>
          </div>
          <div className="flex items-center">
            <p className="mr-3 text-white">{user.displayName}</p>
            <Avatar user={user} extraClasses="bg-white dark:bg-primary" />
          </div>
        </div>
      </header>
      <div
        className={`py-32 px-6 lg:px-10 ${
          bgStyle || "bg-gradient-to-r from-gradient-7-start to-gradient-7-stop"
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default AdminPageTitle;
