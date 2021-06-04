import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BlogCard from "../BlogCard";
import Container from "../Container";

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
    <Container bgColor="bg-gradient-2 bg-no-repeat bg-center bg-cover">
      <div className="pb-10 md:pb-16 pt-16">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="uppercase font-medium text-gray-500 dark:text-gray-300">
            Latest News —
          </p>
          <h1 className="font-bold text-3xl md:text-4xl mb-4">
            Recent blog post
          </h1>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 768: 3 }}>
          <Masonry gutter="32">
            {Posts.map((post, idx) => (
              <BlogCard post={post} key={idx} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </Container>
  );
};

export default RecentBlog;
