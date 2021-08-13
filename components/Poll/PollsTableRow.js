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
import { serverTimestampToString, Truncate } from "@lib/healper";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiPieChart2Fill } from "react-icons/ri";

const PollsTableRow = ({ poll }) => {
  const [isPublic, setIsPublic] = useState(poll.public || false);
  const [isActive, setIsActive] = useState(poll.active || true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIsLoading, setActiveIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);

  const togglePublic = () => {
    setIsLoading(true);
    if (isLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("polls")
      .doc(poll.id)
      .update({
        public: !isPublic,
      })
      .then(() => {
        setIsLoading(false);
        setIsPublic(!isPublic);
        return toast.success("Success!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setIsLoading(false);
        return toast.error("Failed!");
      });
  };
  const toggleActive = () => {
    setActiveIsLoading(true);
    if (activeIsLoading) {
      return toast.error("Please wait!");
    }
    firestore
      .collection("polls")
      .doc(poll.id)
      .update({
        active: !isActive,
      })
      .then(() => {
        setActiveIsLoading(false);
        setIsActive(!isActive);
        return toast.success("Success!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setActiveIsLoading(false);
        return toast.error("Failed!");
      });
  };
  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("polls")
      .doc(poll.id)
      .delete()
      .then(() => {
        toast.success("Poll deleted!");
        setProcessFinished(true);
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        return toast.error("Error removing poll!");
      });
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm line-clamp-1 font-medium text-gray-900 dark:text-gray-100">
          {Truncate(poll.questions?.[0].text, 32)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {serverTimestampToString(poll.createdAt)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {poll.userName}
        </div>
        <div className="text-sm text-gray-500">{poll.userEmail}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Toggle
          enabled={isPublic}
          onChange={togglePublic}
          size={60}
          isLoading={isLoading}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        <Toggle
          enabled={isActive}
          onChange={toggleActive}
          size={60}
          isLoading={activeIsLoading}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {poll.totalVotes || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span className="mr-3">
            <Link href={`/poll/results/${poll.id}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <RiPieChart2Fill />
              </a>
            </Link>
          </span>
          <span className="mr-3">
            <Link href={`/admin/poll/edit/${poll.id}`}>
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

export default PollsTableRow;
