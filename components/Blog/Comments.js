import CommentsForm from "./CommentsForm";

const Comments = ({ post }) => {
  return (
    <div>
      <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 mx-4">
        <p className="font-semibold text-gray-600 dark:text-gray-300">
          Comments (0)
        </p>
      </div>
      <CommentsForm post={post} />
    </div>
  );
};

export default Comments;
