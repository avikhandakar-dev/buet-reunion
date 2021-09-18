import Container from "@components/Container";
import ProjectCard from "@components/Project/Card";
import ProjectsHeader from "@components/Project/Header";
import Empty from "@components/Svg/Empty";
import { firestore } from "@lib/firebase";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ProjectsPage = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore
      .collection("projects")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
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
          </div>
        </>
      )}
      {!loading && projects.length >= 1 && (
        <>
          <Container bgColor="bg-gradient-to-l dark:from-darkBlue dark:to-darkSky">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 -mt-8 dark:-mt-0 auto-rows-fr">
              {projects.map((project, idx) => (
                <div className="lg:first:col-span-2" key={idx}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default ProjectsPage;
