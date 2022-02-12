import { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import Toggle from "@components/Toggle";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import ConfirmModal from "@components/Confirm";
import { Truncate } from "@lib/healper";

const PostsTableRow = ({ post }) => {
  const [isFeatured, setIsFeatured] = useState(post.featured || false);
  const [isPublished, setIsPublished] = useState(post.published || false);
  const [isMembersOnly, setIsMembersOnly] = useState(post.membersOnly || false);
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [isPubLoading, setPubIsLoading] = useState(false);
  const [isMemLoading, setMemIsLoading] = useState(false);

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
  const togglePublished = () => {
    setPubIsLoading(true);
    if (isPubLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("posts")
      .doc(post.id)
      .update({
        published: !isPublished,
      })
      .then(() => {
        setPubIsLoading(false);
        setIsPublished(!isPublished);
        return toast.success("Success!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setPubIsLoading(false);
        return toast.error("Failed!");
      });
  };
  const toggleMembersOnly = () => {
    setMemIsLoading(true);
    if (isMemLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("posts")
      .doc(post.id)
      .update({
        membersOnly: !isMembersOnly,
      })
      .then(() => {
        setMemIsLoading(false);
        setIsMembersOnly(!isMembersOnly);
        return toast.success("Success!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        return toast.error("Failed!");
      });
  };
  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("posts")
      .doc(post.id)
      .delete()
      .then(() => {
        toast.success("Post deleted!");
        setProcessFinished(true);
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        return toast.error("Error removing post!");
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
              {Truncate(post.title, 50)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {/* {post.createdAt} */}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {post.authorName}
        </div>
        <div className="text-sm text-gray-500">{post.authorEmail}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Toggle
          enabled={isFeatured}
          onChange={toggleFeatured}
          size={60}
          isLoading={isLoading}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Toggle
          enabled={isPublished}
          onChange={togglePublished}
          size={60}
          isLoading={isPubLoading}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Toggle
          enabled={isMembersOnly}
          onChange={toggleMembersOnly}
          size={60}
          isLoading={isMemLoading}
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
            <Link href={`/blog/${post.slug}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <BsEyeFill />
              </a>
            </Link>
          </span>
          <span className="mr-3">
            <Link href={`/admin/posts/edit/${post.id}`}>
              <a className="text-yellow-500 hover:text-yellow-400 text-lg">
                <FiEdit />
              </a>
            </Link>
          </span>
          <span className="flex justify-center items-center">
            <ConfirmModal
              body="Do you really want to delete this post? This process cannot be undone."
              className="outline-none focus:outline-none text-red-500 hover:text-red-400 text-lg"
              buttonIcon={<IoTrashOutline />}
              action={handelDelete}
              isLoading={isLoading}
              processFinished={processFinished}
            />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default PostsTableRow;
