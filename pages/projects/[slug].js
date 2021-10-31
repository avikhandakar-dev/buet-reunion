import { DefaultSeo } from "next-seo";
import ProjectContent from "@components/Project/Content";
import { firestore, firestoreToJSON } from "@lib/firebase";
import { Fragment, useState, useEffect } from "react";
import ProjectSingleHeader from "@components/Project/ProjectHeader";
import { useRouter } from "next/router";
import Empty from "@components/Svg/Empty";
import { CgSpinner } from "react-icons/cg";

const ProjectSinglePage = () => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const SEO = {
    title: `Buetian 89 NA | ${project?.title}`,
    description: project?.excerpt,
  };

  useEffect(() => {
    const unsubs = async () => {
      if (!slug) {
        return;
      }

      const projectQuery = firestore
        .collection("projects")
        .where("slug", "==", slug)
        .limit(1);
      const projects = (await projectQuery.get()).docs;
      if (projects.length) {
        setProject(projects[0].data());
      }
      setIsLoading(false);
    };
    return unsubs();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <span className="inline-flex text-5xl animate-spin text-primary">
          <CgSpinner />
        </span>
      </div>
    );
  }
  if (!isLoading && !project) {
    return (
      <div className="mb-32 mt-48 px-5 flex flex-col justify-center items-center">
        <Empty width={150} className="text-gray-600 dark:text-gray-200" />
        <p className="mt-2">Project not found!</p>
      </div>
    );
  }
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ProjectSingleHeader project={project} />
      <ProjectContent project={project} />
    </Fragment>
  );
};

export default ProjectSinglePage;
