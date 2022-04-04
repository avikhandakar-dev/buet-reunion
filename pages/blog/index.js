import BlogHeader from "@components/Blog/BlogHeader";
import { Fragment, useState } from "react";
import Empty from "@components/Svg/Empty";
import { firestore } from "@lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import Container from "@components/Container";
import BlogCard from "@components/BlogCard";

const BlogPage = () => {
  const [isMember, setIsMember] = useState(false);
  const [posts = [], loading, error] = useCollectionData(
    firestore
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
  );

  return (
    <Fragment>
      <BlogHeader />
      {loading && (
        <>
          <div className="max-w-7xl mx-auto flex justify-center items-center mb-32">
            <span className="inline-flex text-5xl animate-spin text-primary">
              <CgSpinner />
            </span>
          </div>
        </>
      )}
      {!loading && posts.length < 1 && (
        <>
          <div className="mb-32 px-5 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
          </div>
        </>
      )}
      {!loading && posts.length >= 1 && (
        <>
          <Container bgColor="bg-gradient-to-l dark:from-darkBlue dark:to-darkSky">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 -mt-8 dark:-mt-0 auto-rows-fr">
              {posts.map((post, idx) => (
                <div
                  className={`${
                    posts.length > 1
                      ? "lg:first:col-span-2"
                      : "lg:first:col-span-3"
                  }`}
                  key={idx}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default BlogPage;
