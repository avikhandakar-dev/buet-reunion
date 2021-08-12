import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import NewPoll from "@components/Poll/NewPoll";
import AdminLayout from "layouts/admin";

const NewPollAdmin = () => {
  return (
    <div>
      <AdminPageTitle title="New Poll">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <NewPoll />
        </div>
      </div>
    </div>
  );
};

NewPollAdmin.layout = AdminLayout;
export default NewPollAdmin;
