import AdminPageTitle from "@components/Admin/PageTitle";
import AdminLayout from "layouts/admin";
import PulseBar from "@components/Pulse/Bar";
import AuthContext from "@lib/authContext";
import { useContext, useState, useEffect } from "react";
import UsersTable from "@components/Admin/UsersTable";

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

  const isAdmin = members.filter((member) => {
    if (member.customClaims?.admin) {
      return member;
    }
  });
  const isPremium = members.filter((member) => {
    if (member.customClaims?.premium) {
      return member;
    }
  });
  const isMember = members.filter((member) => {
    if (member.customClaims?.member) {
      return member;
    }
  });
  const isRegistered = members.filter((member) => {
    if (
      !member.customClaims?.member &&
      !member.customClaims?.premium &&
      !member.customClaims?.admin
    ) {
      return member;
    }
  });

  return (
    <div>
      <AdminPageTitle title={`Users - ${members.length}`} />
      <div>
        {isLoading ? (
          <PulseBar count={3} />
        ) : (
          <>
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
              <UsersTable users={isRegistered} category="Registered Users" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

UsersAdmin.layout = AdminLayout;
export default UsersAdmin;
