import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BlogCard from "../BlogCard";
import Container from "../Container";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const Posts = [
  {
    title: "The quick brown fox jumped over the lazy dog.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: "Engineering, Help",
    authorName: "Avi Khandakar",
    datePosted: "Jun 3, 2021",
    imageURL: "/img/blog/1.jpeg",
    authorProfileImageURL: "",
    views: 766,
  },
  {
    title: "The quick brown fox jumped over the lazy dog.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: "Engineering, Help",
    authorName: "Avi Khandakar",
    datePosted: "Jun 3, 2021",
    authorProfileImageURL: "",
    views: 986,
  },
  {
    title: "The quick brown fox jumped over the lazy dog.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: "Engineering, Help",
    authorName: "Avi Khandakar",
    datePosted: "Jun 3, 2021",
    imageURL: "/img/blog/2.jpeg",
    authorProfileImageURL: "",
    views: 8986,
  },
  {
    title: "The quick brown fox jumped over the lazy dog.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: "Engineering, Help",
    authorName: "Avi Khandakar",
    datePosted: "Jun 3, 2021",
    authorProfileImageURL: "",
    views: 120,
  },
  {
    title: "The quick brown fox jumped over the lazy dog.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: "Engineering, Help",
    authorName: "Avi Khandakar",
    datePosted: "Jun 3, 2021",
    authorProfileImageURL: "",
    views: 676,
  },
];
const RecentBlog = () => {
  return (
    <Container bgColor="bg-gradient-to-l from-darkBlue to-darkSky">
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h1 className="mb-4 text-4xl text-white font-black md:text-6xl xl:text-7xl">
          Recent{" "}
          <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-yellow-400 to-yellow-200 transform rotate-0 inline-block">
            blog
          </span>{" "}
          post
        </h1>
        <Link href="/projects">
          <a className="text-xl text-white w-max mx-auto lg:text-2xl transition-colors duration-300 hover:text-yellow-400 flex justify-center items-center">
            View all posts{" "}
            <span className="">
              <AiOutlineArrowRight />
            </span>
          </a>
        </Link>
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 768: 3 }}>
        <Masonry gutter={32}>
          {Posts.map((post, idx) => (
            <BlogCard post={post} key={idx} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default RecentBlog;
