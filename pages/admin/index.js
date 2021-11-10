import AdminPageTitle from "@components/Admin/PageTitle";
import AdminLayout from "layouts/admin";
import AuthContext from "@lib/authContext";
import { useContext, useState, useEffect } from "react";
import UsersTable from "@components/Admin/UsersTable";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import { GetUsersStatus } from "@lib/healper";
import LoaderAdmin from "@components/Admin/Loader";

const UsersAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const unsubs = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("/api/users", {
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { error, data } = await res.json();
      if (!error) {
        setMembers(data.users);
      }
      setIsLoading(false);
    };
    return unsubs();
  }, []);

  const { isAdmin, isPremium, isMember, isRegistered } =
    GetUsersStatus(members);

  return (
    <div>
      <AdminPageTitle title="Users">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {isLoading ? (
          <LoaderAdmin title="Users" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <UsersTable
                users={isRegistered}
                category="Pending"
                isOpen={true}
                buttonClass="flex font-medium text-xl py-4 px-5 justify-between w-full text-left text-yellow-900 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-500 hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75"
              />
            </div>
            <div className="mb-6">
              <UsersTable
                users={isPremium}
                category="Premium Members"
                buttonClass="flex font-medium text-xl py-4 px-5 justify-between w-full text-left text-purple-900 bg-purple-100 dark:text-purple-100 dark:bg-purple-600 hover:bg-purple-200 dark:hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              />
            </div>
            <div className="mb-6">
              <UsersTable
                users={isMember}
                category="Members"
                buttonClass="flex font-medium text-xl py-4 px-5 justify-between w-full text-left text-green-900 bg-green-100 dark:text-green-100 dark:bg-green-600 hover:bg-green-200 dark:hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
              />
            </div>
            <div className="mb-6">
              <UsersTable
                users={isAdmin}
                category="Admin"
                buttonClass="flex font-medium text-xl py-4 px-5 justify-between w-full text-left text-purple-900 bg-purple-100 dark:text-purple-100 dark:bg-purple-600 hover:bg-purple-200 dark:hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UsersAdmin.layout = AdminLayout;
export default UsersAdmin;
