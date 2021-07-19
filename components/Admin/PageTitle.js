import Avatar from "@components/Avatar";
import AuthContext from "@lib/authContext";
import { Fragment, useContext } from "react";

const AdminPageTitle = ({ title, children, bgStyle }) => {
  const { user } = useContext(AuthContext);
  return (
    <Fragment>
      <header className="absolute top-0 left-auto right-0 w-full bg-transparent">
        <div className="h-16  px-6 lg:px-10 flex justify-between items-center">
          <div className="text-lg text-white font-medium uppercase">
            {title}
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
