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
      console.log(token);
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
        console.log(data.users);
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
              <UsersTable users={isAdmin} category="Admin" />
            </div>
            <div className="mb-6">
              <UsersTable users={isPremium} category="Premium Members" />
            </div>
            <div className="mb-6">
              <UsersTable users={isMember} category="Members" />
            </div>
            <div className="mb-6">
              <UsersTable users={isRegistered} category="Pending" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UsersAdmin.layout = AdminLayout;
export default UsersAdmin;
