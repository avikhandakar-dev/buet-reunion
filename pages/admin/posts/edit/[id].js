import { firestore, firestoreToJSON } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import EditPost from "@components/Blog/EditPost";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";

const EditPostAdmin = ({ post }) => {
  return (
    <div>
      <AdminPageTitle title="Edit Post">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <EditPost post={post} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const postQuery = firestore
    .collection("posts")
    .where("id", "==", id)
    .limit(1);

  const post = (await postQuery.get()).docs.map(firestoreToJSON);

  if (!post.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post: post[0] },
  };
};

EditPostAdmin.layout = AdminLayout;
export default EditPostAdmin;
