import { serialize } from "next-mdx-remote/serialize";
import { DefaultSeo } from "next-seo";
import ProjectContent from "@components/Project/Content";
import { firestore, postOrProjectToJSON } from "@lib/firebase";
import { Fragment } from "react";
import ProjectSingleHeader from "@components/Project/ProjectHeader";

const ProjectSinglePage = ({ project, mdxSource }) => {
  const SEO = {
    title: `Buetian 89 | ${project.title}`,
    description: project.excerpt,
  };
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <ProjectSingleHeader project={project} />
      <ProjectContent mdxSource={mdxSource} project={project} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const projectQuery = await firestore
    .collection("projects")
    .where("slug", "==", slug)
    .limit(1);

  const projects = (await projectQuery.get()).docs.map(postOrProjectToJSON);

  if (!projects.length) {
    return {
      notFound: true,
    };
  }
  const project = projects[0];
  const mdxSource = await serialize(project.text);
  return {
    props: { project, mdxSource },
  };
};
export default ProjectSinglePage;
