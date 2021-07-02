import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import AdminLayout from "layouts/admin";

const ProjectsAdmin = () => {
  return (
    <div>
      <AdminPageTitle
        title="Projects"
        action={{ title: "New Project", href: "/admin/projects/new" }}
      >
        <WidgetsViewerAdmin />
      </AdminPageTitle>
    </div>
  );
};

ProjectsAdmin.layout = AdminLayout;
export default ProjectsAdmin;
