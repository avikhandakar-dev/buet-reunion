import AdminLayout from "layouts/admin";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";

const DonationsAdmin = () => {
  return (
    <div>
      <AdminPageTitle
        title="Donation"
        action={{ title: "New Project", href: "/admin/projects/new" }}
      >
        <WidgetsViewerAdmin />
      </AdminPageTitle>
    </div>
  );
};

DonationsAdmin.layout = AdminLayout;
export default DonationsAdmin;