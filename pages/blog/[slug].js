import PostContent from "@components/Blog/PostContent";
import PostHeader from "@components/Blog/PostHeader";
import { firestore, firestoreToJSON } from "@lib/firebase";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { DefaultSeo } from "next-seo";

const BlogSinglePage = ({ post, mdxSource }) => {
  const [author, setAuthor] = useState([]);
  const SEO = {
    title: `Buetian 89 | ${post.title}`,
    description: post.excerpt,
  };
  useEffect(() => {
    const unsubs = async () => {
      const res = await fetch("/api/users/get", {
        body: JSON.stringify({
          uid: post.authorId,
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
      <DefaultSeo {...SEO} />
      <PostHeader post={post} author={author} />
      <PostContent mdxSource={mdxSource} post={post} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const postQuery = await firestore
    .collection("posts")
    .where("slug", "==", slug)
    .limit(1);

  const posts = (await postQuery.get()).docs.map(firestoreToJSON);

  if (!posts.length) {
    return {
      notFound: true,
    };
  }
  const post = posts[0];
  const mdxSource = await serialize(post.text);
  return {
    props: { post, mdxSource },
  };
};
export default BlogSinglePage;
