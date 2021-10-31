import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";

const SettingsAdmin = () => {
  return (
    <Fragment>
      <AdminPageTitle title="Settings">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">Work in progress!</div>
    </Fragment>
  );
};

SettingsAdmin.layout = AdminLayout;
export default SettingsAdmin;
