import AdminLayout from "layouts/admin";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoaderAdmin from "@components/Admin/Loader";
import { firestore } from "@lib/firebase";
import { Fragment } from "react";
import DonationsTable from "@components/Donate/DonationsTable";

const DonationsAdmin = () => {
  const [donations = [], loading, error] = useCollectionData(
    firestore.collection("donations").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <AdminPageTitle
        title="Donation"
        action={{ title: "New Project", href: "/admin/projects/new" }}
      >
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {loading ? (
          <LoaderAdmin title="Donations" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <DonationsTable donations={donations} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

DonationsAdmin.layout = AdminLayout;
export default DonationsAdmin;
