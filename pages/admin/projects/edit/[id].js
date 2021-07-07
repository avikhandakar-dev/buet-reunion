import { firestore, postOrProjectToJSON } from "@lib/firebase";
import AdminLayout from "layouts/admin";
import EditProject from "@components/Admin/EditProject";
import AdminPageTitle from "@components/Admin/PageTitle";
import WidgetsViewerAdmin from "@components/Admin/WidgetsViewer";

const EditProjectAdmin = ({ project }) => {
  return (
    <div>
      <AdminPageTitle title="Edit Project">
        <WidgetsViewerAdmin />
      </AdminPageTitle>
      <div className="px-6 lg:px-10 -mt-24">
        <div className="mb-6">
          <EditProject project={project} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const projectQuery = await firestore
    .collection("projects")
    .where("id", "==", id)
    .limit(1);

  const project = (await projectQuery.get()).docs.map(postOrProjectToJSON);

  if (!project.length) {
    return {
      notFound: true,
    };
  }
  console.log(project[0]);
  return {
    props: { project: project[0] },
  };
};

EditProjectAdmin.layout = AdminLayout;
export default EditProjectAdmin;
