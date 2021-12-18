import { useContext, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import Toggle from "@components/Toggle";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import ConfirmModal from "@components/Confirm";
import { fetchPostJSON, serverTimestampToString, Truncate } from "@lib/healper";
import { RiMailSendFill, RiPieChart2Fill } from "react-icons/ri";
import AuthContext from "@lib/authContext";
import { FaHourglassEnd } from "react-icons/fa";

const PollsTableRow = ({ poll }) => {
  const [isPublic, setIsPublic] = useState(poll.public || false);
  const [isActive, setIsActive] = useState(poll.active || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeIsLoading, setActiveIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const { user } = useContext(AuthContext);

  const sendMail = async () => {
    if (poll.access == "emails" && !poll.whiteList?.length) {
      return toast.error("Nothing to send!");
    }
    setIsSending(true);
    const token = await user?.getIdToken();
    let emailsList = [];
    if (poll.access == "emails") {
      emailsList = poll.whiteList;
    } else {
      const getEmailRes = await fetchPostJSON("/api/users/get-members-email", {
        token: token,
      });
      if (getEmailRes.statusCode === 200) {
        emailsList = getEmailRes.emails;
      } else {
        toast.error(getEmailRes.message);
      }
    }
    const response = await fetchPostJSON("/api/mail/new-poll", {
      token: token,
      emails: emailsList,
      title: poll.questions[0].text,
      pollId: poll.id,
    });
    if (response.statusCode === 200) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsSending(false);
  };
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
        {poll.category == "election" ? (
          ""
        ) : (
          <Toggle
            enabled={isPublic}
            onChange={togglePublic}
            size={60}
            isLoading={isLoading}
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {poll.category == "election" ? (
          ""
        ) : (
          <Toggle
            enabled={isActive}
            onChange={toggleActive}
            size={60}
            isLoading={activeIsLoading}
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {poll.voters?.length || 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span title="Show result" className="mr-3">
            <Link href={`/poll/results/${poll.id}`}>
              <a className="text-green-500 hover:text-green-400 text-lg">
                <RiPieChart2Fill />
              </a>
            </Link>
          </span>
          <span title="Send email" className="mr-3">
            <button
              onClick={() => sendMail()}
              disabled={isSending}
              className="text-yellow-500 hover:text-yellow-400 text-lg"
            >
              {isSending ? <FaHourglassEnd /> : <RiMailSendFill />}
            </button>
          </span>
          <span
            title="Delete poll"
            className="flex justify-center items-center"
          >
            <ConfirmModal
              body="Do you really want to delete this poll? This process cannot be undone."
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
