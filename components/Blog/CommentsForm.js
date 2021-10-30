import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import firebase, { firestore, serverTimestamp } from "@lib/firebase";
import toast from "react-hot-toast";
import { Spin } from "@components/Svg/Spin";
import AuthContext from "@lib/authContext";
import Link from "next/link";

const CommentsForm = ({ post }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const commentId = nanoid();
    const batch = firestore.batch();
    const commentRef = firestore.collection("comments").doc(commentId);
    const aggregationRef = firestore.collection("aggregations").doc("comments");
    try {
      batch.set(commentRef, {
        id: commentId,
        postInfo: {
          id: post.id,
          title: post.title,
          slug: post.slug,
        },
        authorInfo: {
          avatar: user?.photoURL,
          email: user?.email,
          name: user?.displayName,
          uid: user?.uid,
        },
        createdAt: serverTimestamp(),
        text,
      });
      batch.update(aggregationRef, {
        total: firebase.firestore.FieldValue.increment(1),
      });
      await batch.commit();
      toast.success("Comment posted!");
      setText("");
      return setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      return setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mt-4 mx-4 mb-16 relative text-gray-500">
        Please{" "}
        <Link href="/accounts/login">
          <a className="text-yellow-500 font-semibold underline">login</a>
        </Link>{" "}
        to post comment.
      </div>
    );
  }

  return (
    <div class="mt-4 mx-4 mb-16 relative">
      <form
        onSubmit={(event) => handleSubmit(event)}
        class="w-full bg-white dark:bg-gray-900 shadow-md px-4 pt-4 rounded-lg overflow-hidden"
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-2 mt-2">
            <textarea
              onChange={(event) => setText(event.target.value)}
              value={text}
              class="bg-gray-100 dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-700 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:focus:bg-gray-900"
              name="comment"
              placeholder="Add a comment..."
              required
            />
          </div>
          <div class="w-full flex justify-end items-end px-3">
            <div class="-mr-1">
              <button
                disabled={isLoading}
                className="px-4 py-2 rounded bg-primary duration-300 hover:bg-sky text-white font-medium"
                type="submit"
              >
                {isLoading ? (
                  <span className="inline-flex">
                    <Spin />
                    Please wait
                  </span>
                ) : (
                  "Post Comment"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
