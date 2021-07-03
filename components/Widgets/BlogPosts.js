import { useState } from "react";
import AuthContext from "@lib/authContext";
import { BsFillGridFill } from "react-icons/bs";

const BlogPostsWidget = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="uppercase text-gray-400 dark:text-gray-200 text-sm">
            Posts
          </p>
          <p className="text-black dark:text-white text-2xl">0</p>
        </div>
        <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-sky rounded-full">
          <BsFillGridFill />
        </div>
      </div>
      <div className="flex">
        <p className="text-gray-400 dark:text-gray-200 mr-3">
          Total views <span className="text-green-400">0</span>
        </p>
      </div>
    </div>
  );
};

export default BlogPostsWidget;
