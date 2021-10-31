import PostContent from "@components/Blog/PostContent";
import PostHeader from "@components/Blog/PostHeader";
import { firestore } from "@lib/firebase";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import Comments from "@components/Blog/Comments";
import { useRouter } from "next/router";
import Empty from "@components/Svg/Empty";
import { CgSpinner } from "react-icons/cg";

const BlogSinglePage = () => {
  const [author, setAuthor] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const SEO = {
    title: `Buetian 89 NA | ${post?.title}`,
    description: post?.excerpt,
  };
  useEffect(() => {
    const unsubs = async () => {
      if (!slug) {
        return;
      }
      const postQuery = firestore
        .collection("posts")
        .where("slug", "==", slug)
        .limit(1);
      const posts = (await postQuery.get()).docs;
      if (posts.length) {
        setPost(posts[0].data());
      }
      setIsLoading(false);
    };
    return unsubs();
  }, [slug]);

  useEffect(() => {
    const unsubs = async () => {
      if (!post) {
        return;
      }
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
  }, [post]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <span className="inline-flex text-5xl animate-spin text-primary">
          <CgSpinner />
        </span>
      </div>
    );
  }
  if (!isLoading && !post) {
    return (
      <div className="mb-32 mt-48 px-5 flex flex-col justify-center items-center">
        <Empty width={150} className="text-gray-600 dark:text-gray-200" />
        <p className="mt-2">Post not found!</p>
      </div>
    );
  }
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <PostHeader post={post} author={author} />
      <PostContent post={post} />
      <div className="max-w-3xl mx-auto w-full relative">
        <Comments post={post} />
      </div>
    </Fragment>
  );
};

export default BlogSinglePage;
