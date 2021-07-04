import AdminPageTitle from "@components/Admin/PageTitle";
import MediaGrid from "@components/Admin/MediaGrid";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const MediaAdmin = () => {
  const [media = [], loading, error] = useCollectionData(
    firestore.collection("media").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <AdminPageTitle title="Media">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {loading ? (
          <div className="px-6 lg:px-10 -mt-24">
            <PulseBar count={8} cols={4} height={48} />
          </div>
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <MediaGrid media={media} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

MediaAdmin.layout = AdminLayout;
export default MediaAdmin;
