import PostContent from "@components/Blog/PostContent";
import PostHeader from "@components/Blog/PostHeader";
import { firestore, postOrProjectToJSON } from "@lib/firebase";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const BlogSinglePage = ({ post, mdxSource }) => {
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    const unsubs = async () => {
      const res = await fetch("/api/users/get", {
        body: JSON.stringify({
          uid: post.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { error, data } = await res.json();
      if (!error) {
        setAuthor(data);
      }
    };
    return unsubs();
  }, []);
  return (
    <Fragment>
      <PostHeader post={post} author={author} />
      <PostContent mdxSource={mdxSource} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const postQuery = await firestore
    .collection("posts")
    .where("slug", "==", slug)
    .limit(1);

  const posts = (await postQuery.get()).docs.map(postOrProjectToJSON);

  if (!posts.length) {
    return {
      notFound: true,
    };
  }
  const post = posts[0];
  const source = "Some **mdx** text, with a component <Parallax />";
  const mdxSource = await serialize(post.text);
  return {
    props: { post, mdxSource },
  };
};
export default BlogSinglePage;
