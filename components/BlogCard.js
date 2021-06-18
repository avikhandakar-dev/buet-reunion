import { useState } from "react";
import { AiOutlineUser, AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
const { default: Image } = require("next/image");

const BlogCard = ({ post }) => {
  const [hover, setHover] = useState(false);
  const tags = post.tags?.split(",");
  const noImgCss = post.imageURL ? null : "p-4  shadow-blogCard";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`rounded-md shadow-blogCard bg-black bg-opacity-30 hover:bg-black hover:shadow-none border-2 border-transparent hover:border-white relative`}
    >
      <div
        className={`absolute top-3 border-2 border-black rounded-md dark:border-white ${
          !hover ? "hidden" : "block"
        }`}
        style={{
          width: "calc(100% + 15px)",
          height: "100%",
          zIndex: "-1",
          right: "-2px",
        }}
      />
      {post.imageURL && (
        <div className="w-full relative aspect-w-10 aspect-h-6 overflow-hidden rounded-t-md">
          <Image src={post.imageURL} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-4 md:p-6">
        {tags && (
          <div className="flex mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="mr-2 px-3 py-1 text-xs text-yellow-800 bg-yellow-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
          {post.title}
        </h3>
        <p className="text-gray-200 font-medium">{post.excerpt}</p>
        <div className="flex text-white justify-between mt-3 text-sm font-medium">
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineUser />
            </span>
            <span>{post.authorName}</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineCalendar />
            </span>
            {post.datePosted}
          </div>
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineEye />
            </span>
            {post.views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
