import AdminPageTitle from "@components/Admin/PageTitle";
import ProjectsGrid from "@components/Admin/ProjectsGrid";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ProjectsAdmin = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <AdminPageTitle
        title="Projects"
        action={{ title: "New Project", href: "/admin/projects/new" }}
      >
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div>
        {loading ? (
          <div className="px-6 lg:px-10 -mt-24">
            <PulseBar count={8} cols={4} height={48} />
          </div>
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <ProjectsGrid projects={projects} />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

ProjectsAdmin.layout = AdminLayout;
export default ProjectsAdmin;
