import AdminPageTitle from "@components/Admin/PageTitle";
import MediaGrid from "@components/Admin/MediaGrid";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import LoaderAdmin from "@components/Admin/Loader";

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
          <LoaderAdmin title="Media" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <MediaGrid media={media} />
            </div>
          </div>
        )}
      </div>
      {media.length > 0 && (
        <Link href="/admin/media/upload">
          <a className="fixed w-14 h-14 flex justify-center items-center right-8 bottom-4 text-3xl bg-primary shadow-md transition-colors duration-300 hover:bg-sky rounded-full text-white">
            <FiPlus />
          </a>
        </Link>
      )}
    </Fragment>
  );
};

MediaAdmin.layout = AdminLayout;
export default MediaAdmin;
