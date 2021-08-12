import AdminLayout from "layouts/admin";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";
import LoaderAdmin from "@components/Admin/Loader";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import PollsTable from "@components/Poll/PollsTable";

const DonationsAdmin = () => {
  const [polls = [], loading] = useCollectionData(
    firestore.collection("polls").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <AdminPageTitle title="Polls">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {loading ? (
          <LoaderAdmin title="Polls" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <PollsTable polls={polls} />
            </div>
          </div>
        )}
      </div>
      {polls.length > 0 && (
        <Link href="/admin/polls/new">
          <a
            title="Create new poll"
            className="fixed w-14 h-14 flex justify-center items-center right-8 bottom-4 text-3xl bg-primary shadow-md transition-colors duration-300 hover:bg-sky rounded-full text-white"
          >
            <FiPlus />
          </a>
        </Link>
      )}
    </Fragment>
  );
};

DonationsAdmin.layout = AdminLayout;
export default DonationsAdmin;
