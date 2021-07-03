import AdminPageTitle from "@components/Admin/PageTitle";
import PostsGrid from "@components/Admin/PostsGrid";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const PostsAdmin = () => {
  const [posts = [], loading, error] = useCollectionData(
    firestore.collection("posts").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <AdminPageTitle title="Posts">
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
              <PostsGrid posts={posts} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

PostsAdmin.layout = AdminLayout;
export default PostsAdmin;
