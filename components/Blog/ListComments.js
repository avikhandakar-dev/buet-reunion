import AuthContext from "@lib/authContext";
import { serverTimestampToString } from "@lib/healper";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import ConfirmModal from "@components/Confirm";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";

const ListComments = ({ comments }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handelDelete = async (id) => {
    setIsLoading(true);
    setProcessFinished(false);
    try {
      await firestore.collection("comments").doc(id).delete();
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Error deleting comment!");
    }
    setIsLoading(false);
    setProcessFinished(true);
  };

  useEffect(() => {
    const unsubs = async () => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (!!idTokenResult.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };
    return unsubs();
  }, [user]);

  return (
    <div className="mt-4 mx-4 mb-16 flex space-y-4 flex-col">
      {comments.map((comment) => (
        <div className="flex space-x-4 relative" key={comment.id}>
          <div className="border-2 flex-shrink-0 outline-none focus:outline-none border-gray-200 dark:border-gray-600 relative rounded-full overflow-hidden w-11 h-11">
            <Image
              src={comment.authorInfo.avatar || "/img/avatar.svg"}
              width={44}
              height={44}
              objectFit="cover"
            />
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed flex-1">
            <strong>{comment.authorInfo.name}</strong>{" "}
            <span class="text-xs text-gray-400">
              {serverTimestampToString(comment.createdAt)}
            </span>
            <p className="text-sm">{comment.text}</p>
          </div>
          {isAdmin && (
            <div title="Delete comment" className="absolute top-2 right-2">
              <span className="w-8 h-8 rounded-full flex justify-center items-center">
                <ConfirmModal
                  body="Do you really want to delete this post? This process cannot be undone."
                  className="outline-none focus:outline-none text-red-500 hover:text-red-400 text-lg"
                  buttonIcon={<IoTrashOutline />}
                  action={() => handelDelete(comment.id)}
                  isLoading={isLoading}
                  processFinished={processFinished}
                />
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListComments;
