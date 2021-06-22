import AdminPageTitle from "@components/Admin/PageTitle";
import AdminLayout from "layouts/admin";

const NewProjectAdmin = () => {
  return (
    <div>
      <AdminPageTitle title="New Project" />
    </div>
  );
};

NewProjectAdmin.layout = AdminLayout;
export default NewProjectAdmin;
