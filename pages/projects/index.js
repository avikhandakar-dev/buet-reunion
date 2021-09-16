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
          <Container bgColor="bg-blue-700">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 640: 2, 768: 3 }}
            >
              <Masonry gutter={32}>
                {projects.map((project) => (
                  <ProjectCard project={project} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default ProjectsPage;
