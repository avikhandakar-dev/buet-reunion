import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";

const CommentsAdmin = () => {
  return (
    <Fragment>
      <AdminPageTitle title="Comments">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">Work in progress!</div>
    </Fragment>
  );
};

CommentsAdmin.layout = AdminLayout;
export default CommentsAdmin;
