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

const ProjectsTableRow = ({ project }) => {
  const [isFeatured, setIsFeatured] = useState(project.featured || false);
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const toggleFeatured = () => {
    setIsLoading(true);
    if (isLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("projects")
      .doc(project.id)
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
        setIsLoading(false);
        return toast.error("Failed!");
      });
  };
  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("projects")
      .doc(project.id)
      .delete()
      .then(() => {
        toast.success("Project deleted!");
        setProcessFinished(true);
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        return toast.error("Error removing project!");
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
                  project.coverImage?.loaderDownloadUrl || "/img/no-image.png"
                }
                src={
                  project.coverImage?.thumbDownloadUrl || "/img/no-image.png"
                }
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
              {project.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {/* {project.createdAt} */}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {project.userName}
        </div>
        <div className="text-sm text-gray-500">{project.userEmail}</div>
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
        ${project.raised || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        ${project.goal}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span className="mr-3">
            <Link href={`/projects/${project.slug}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <BsEyeFill />
              </a>
            </Link>
          </span>
          <span className="mr-3">
            <Link href={`/admin/projects/edit/${project.id}`}>
              <a className="text-yellow-500 hover:text-yellow-400 text-lg">
                <FiEdit />
              </a>
            </Link>
          </span>
          <span className="flex justify-center items-center">
            <ConfirmModal
              body="Do you really want to delete this project? This process cannot be undone."
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

export default ProjectsTableRow;
