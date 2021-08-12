import Container from "@components/Container";
import ProjectCard from "@components/Project/Card";
import ProjectsHeader from "@components/Project/Header";
import Empty from "@components/Svg/Empty";
import { firestore } from "@lib/firebase";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";

const ProjectsPage = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  return (
    <Fragment>
      <ProjectsHeader />
      {loading && (
        <>
          <div className="max-w-7xl mx-auto flex justify-center items-center mb-32">
            <span className="inline-flex text-5xl animate-spin text-primary">
              <CgSpinner />
            </span>
          </div>
        </>
      )}
      {!loading && projects.length < 1 && (
        <>
          <div className="mb-32 px-5 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
            <div className="mt-3">
              <p>No project found :(</p>
            </div>
          </div>
        </>
      )}
      {!loading && projects.length >= 1 && (
        <>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative -mt-8">
              {projects.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default ProjectsPage;
