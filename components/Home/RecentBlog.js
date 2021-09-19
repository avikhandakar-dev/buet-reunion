import BlogCard from "../BlogCard";
import Container from "../Container";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { firestore } from "@lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";

const RecentBlog = () => {
  const [posts = [], loading, error] = useCollectionData(
    firestore
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5)
  );

  if (loading) {
    return <></>;
  }
  if (!loading && posts.length < 1) {
    return <></>;
  }

  return (
    <Container bgColor="bg-gradient-to-l from-darkBlue to-darkSky">
      <div className="max-w-7xl relative">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl text-white font-black md:text-6xl xl:text-7xl">
            Recent{" "}
            <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-yellow-400 to-yellow-200 transform rotate-0 inline-block">
              blog
            </span>{" "}
            post
          </h1>
          <Link href="/blog">
            <a className="text-xl text-white w-max mx-auto lg:text-2xl transition-colors duration-300 hover:text-yellow-400 flex justify-center items-center">
              View all posts{" "}
              <span className="">
                <AiOutlineArrowRight />
              </span>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr sm:px-6">
          {posts.map((post, idx) => (
            <div className="lg:first:col-span-2" key={idx}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RecentBlog;
