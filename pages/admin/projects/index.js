import AdminPageTitle from "@components/Admin/PageTitle";
import ProjectsTable from "@components/Admin/ProjectsTable";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";
import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import Link from "next/link";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FiPlus } from "react-icons/fi";

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
            <PulseBar count={5} />
          </div>
        ) : (
          <div className="px-6 lg:px-10 -mt-24">
            <div className="mb-6">
              <ProjectsTable projects={projects} />
            </div>
          </div>
        )}
      </div>
      {projects.length > 0 && (
        <Link href="/admin/projects/new">
          <a
            title="Add new project"
            className="fixed w-14 h-14 flex justify-center items-center right-8 bottom-4 text-3xl bg-primary shadow-md transition-colors duration-300 hover:bg-sky rounded-full text-white"
          >
            <FiPlus />
          </a>
        </Link>
      )}
    </Fragment>
  );
};

ProjectsAdmin.layout = AdminLayout;
export default ProjectsAdmin;
