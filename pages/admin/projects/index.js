import AdminPageTitle from "@components/Admin/PageTitle";
import AdminLayout from "layouts/admin";

const ProjectsAdmin = () => {
  return (
    <div>
      <AdminPageTitle
        title="Projects"
        action={{ title: "New Project", href: "/admin/projects/new" }}
      />
    </div>
  );
};

ProjectsAdmin.layout = AdminLayout;
export default ProjectsAdmin;
