import { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import Toggle from "@components/Toggle";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import Image from "next/image";

const PostsTableRow = ({ post }) => {
  const [isFeatured, setIsFeatured] = useState(post.featured || false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFeatured = () => {
    setIsLoading(true);
    if (isLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("posts")
      .doc(post.id)
      .update({
        featured: !isFeatured,
      })
      .then(() => {
        setIsLoading(false);
        setIsFeatured(!isFeatured);
        return toast.success("Success!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        return toast.error("Failed!");
      });
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 relative">
            <div className="w-full relative overflow-hidden rounded h-auto transform group-hover:scale-110 transition duration-700">
              <Image
                placeholder="blur"
                blurDataURL={
                  post.coverImage?.loaderDownloadUrl || "/img/no-image.png"
                }
                src={post.coverImage?.thumbDownloadUrl || "/img/no-image.png"}
                width={40}
                height={40}
                priority={true}
                objectFit="cover"
                layout="responsive"
                sizes="40px"
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {post.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {/* {post.createdAt} */}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {post.userName}
        </div>
        <div className="text-sm text-gray-500">{post.userEmail}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Toggle
          enabled={isFeatured}
          onChange={toggleFeatured}
          size={60}
          isLoading={isLoading}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {post.viewCount || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {post.coments || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span className="mr-3">
            <Link href={`/posts/${post.slug}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <BsEyeFill />
              </a>
            </Link>
          </span>
          <span className="mr-3">
            <Link href={`/posts/${post.slug}`}>
              <a className="text-yellow-500 hover:text-yellow-400 text-lg">
                <FiEdit />
              </a>
            </Link>
          </span>
          <span>
            <Link href={`/posts/${post.slug}`}>
              <a className="text-red-500 hover:text-red-400 text-lg">
                <IoTrashOutline />
              </a>
            </Link>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default PostsTableRow;
