import { Fragment, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import Toggle from "@components/Toggle";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import ConfirmModal from "@components/Confirm";
import { serverTimestampToString } from "@lib/healper";
import { useDocumentData } from "react-firebase-hooks/firestore";

const DonationsTableRow = ({ donation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [project = [], loading, error] = useDocumentData(
    firestore.collection("projects").doc(donation.projectId)
  );
  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("donations")
      .doc(donation.id)
      .delete()
      .then(() => {
        toast.success("Donation deleted!");
        setProcessFinished(true);
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        return toast.error("Error removing doc!");
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
            <div className="">
              <Link href={`/projects/${project.slug}`}>
                <a className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {project.title}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          ${donation.amount}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {donation.donorInfo?.anonymous ? (
            "-"
          ) : (
            <Fragment>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {donation.donorInfo?.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {donation.donorInfo?.email}
              </div>
            </Fragment>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {donation.paymentMethod}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {serverTimestampToString(donation.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span className="mr-3">
            {/* <Link href={`/projects/${project.slug}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <BsEyeFill />
              </a>
            </Link> */}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default DonationsTableRow;
