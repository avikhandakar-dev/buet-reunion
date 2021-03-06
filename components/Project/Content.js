import Container from "@components/Container";
import TestMdx from "@components/Mdx/Test";
import Share from "@components/Share";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ProjectContent = ({ project }) => {
  const components = { TestMdx };
  const { asPath } = useRouter();
  return (
    <Container>
      <div className="max-w-3xl relative mx-auto -mt-16 text-xl lg:px-4 prose lg:prose-xl dark:prose-dark prose-green first-letter:text-primary first-letter:font-extrabold first-letter:text-5xl lg:first-letter:text-6xl first-letter:float-left first-letter:pr-2 lg:first-letter:mt-1.5 first-letter:mt-0.5 overflow-x-hidden">
        <ReactMarkdown children={project.text} remarkPlugins={[remarkGfm]} />
        <Share url={asPath} title={project.title} author={project.userName} />
      </div>
    </Container>
  );
};

export default ProjectContent;
