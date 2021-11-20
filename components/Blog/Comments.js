import CommentsForm from "./CommentsForm";
import ListComments from "./ListComments";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";
import { CgSpinner } from "react-icons/cg";

const Comments = ({ post }) => {
  const [comments = [], loading, error] = useCollectionData(
    firestore
      .collection("comments")
      .where("postInfo.id", "==", post.id)
      .orderBy("createdAt", "desc")
  );
  return (
    <div>
      <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 mx-4">
        <p className="font-semibold text-gray-600 dark:text-gray-300">
          Comments ({comments.length})
        </p>
      </div>
      <CommentsForm post={post} />
      {loading && (
        <>
          <div className="max-w-7xl mx-auto flex justify-center items-center mb-32">
            <span className="inline-flex text-5xl animate-spin text-primary">
              <CgSpinner />
            </span>
          </div>
        </>
      )}
      {!loading && comments.length > 0 && <ListComments comments={comments} />}
    </div>
  );
};

export default Comments;
