import Container from "@components/Container";
import TestMdx from "@components/Mdx/Test";
import Share from "@components/Share";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import remarkGfm from "remark-gfm";

const PostContent = ({ post }) => {
  const components = { TestMdx };
  const { asPath } = useRouter();
  return (
    <Container>
      <div className="max-w-3xl text-lg relative mx-auto -mt-16 lg:-mt-8 lg:px-4 prose dark:prose-dark prose-green first-letter:text-primary first-letter:font-extrabold first-letter:text-5xl first-letter:float-left first-letter:pr-2 first-letter:mt-0.5 overflow-x-hidden">
        <ReactMarkdown children={post.text} remarkPlugins={[remarkGfm]} />
        <Share url={asPath} title={post.title} author={post.authorName} />
      </div>
    </Container>
  );
};

export default PostContent;
