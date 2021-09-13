import AdminPageTitle from "@components/Admin/PageTitle";
import UserInfo from "@components/Admin/UserInfo";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import AdminLayout from "layouts/admin";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import LoaderAdmin from "@components/Admin/Loader";
import { firestore } from "@lib/firebase";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@lib/authContext";
import toast from "react-hot-toast";
import { fetchPostJSON } from "@lib/healper";

const UserReview = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [userRecord, setUserRecord] = useState(null);
  const [userData = [], loading, error] = useDocumentData(
    firestore.collection("users").doc(id)
  );
  useEffect(() => {
    const unsubs = async () => {
      if (user) {
        const token = await user?.getIdToken();
        const response = await fetchPostJSON("/api/users/get", {
          uid: id,
          token: token,
        });
        if (response.statusCode === 500) {
          toast.error(response.message);
          return;
        }
        setUserRecord(response.data);
      }
    };
    return unsubs();
  }, [user]);
  return (
    <div>
      <AdminPageTitle title="User Information">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {loading ? (
          <LoaderAdmin title="User Info" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <UserInfo userData={userData} userRecord={userRecord} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UserReview.layout = AdminLayout;
export default UserReview;
