import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import Uploader from "@components/Uploader";

const UploadAdmin = () => {
  return (
    <Fragment>
      <AdminPageTitle title="Media">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <Uploader />
        </div>
      </div>
    </Fragment>
  );
};

UploadAdmin.layout = AdminLayout;
export default UploadAdmin;
