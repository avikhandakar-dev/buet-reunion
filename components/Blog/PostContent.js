import Container from "@components/Container";
import TestMdx from "@components/Mdx/Test";
import { MDXRemote } from "next-mdx-remote";

const PostContent = ({ mdxSource }) => {
  const components = { TestMdx };
  return (
    <Container>
      <div className="max-w-3xl relative mx-auto -mt-16 lg:-mt-8 text-xl lg:px-4 prose lg:prose-xl dark:prose-dark prose-green first-letter:text-primary first-letter:font-extrabold first-letter:text-5xl lg:first-letter:text-6xl first-letter:float-left first-letter:pr-2 lg:first-letter:mt-1.5 first-letter:mt-0.5">
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </Container>
  );
};

export default PostContent;
