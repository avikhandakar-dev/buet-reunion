import AdminPageTitle from "@components/Admin/PageTitle";
import PostsTable from "@components/Blog/PostsTable";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import LoaderAdmin from "@components/Admin/Loader";

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
          <LoaderAdmin title="Blog Posts" />
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <PostsTable posts={posts} />
            </div>
          </div>
        )}
      </div>
      {posts.length > 0 && (
        <Link href="/admin/posts/new">
          <a
            title="Create new blog post"
            className="fixed w-14 h-14 flex justify-center items-center right-8 bottom-4 text-3xl bg-primary shadow-md transition-colors duration-300 hover:bg-sky rounded-full text-white"
          >
            <FiPlus />
          </a>
        </Link>
      )}
    </Fragment>
  );
};

PostsAdmin.layout = AdminLayout;
export default PostsAdmin;
