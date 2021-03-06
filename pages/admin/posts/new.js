import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import NewPost from "@components/Blog/NewPost";
import AdminLayout from "layouts/admin";

const NewPostAdmin = () => {
  return (
    <div>
      <AdminPageTitle title="New Post">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <NewPost />
        </div>
      </div>
    </div>
  );
};

NewPostAdmin.layout = AdminLayout;
export default NewPostAdmin;
