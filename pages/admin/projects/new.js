import NewProject from "@components/Admin/NewProject";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import AdminLayout from "layouts/admin";

const NewProjectAdmin = () => {
  return (
    <div>
      <AdminPageTitle title="New Project">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <NewProject />
        </div>
      </div>
    </div>
  );
};

NewProjectAdmin.layout = AdminLayout;
export default NewProjectAdmin;
