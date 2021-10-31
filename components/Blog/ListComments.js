import { serverTimestampToString, timestampToString } from "@lib/healper";
import Image from "next/image";

const ListComments = ({ comments }) => {
  return (
    <div className="mt-4 mx-4 mb-16 flex space-y-4 flex-col">
      {comments.map((comment) => (
        <div className="flex space-x-4">
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
        </div>
      ))}
    </div>
  );
};

export default ListComments;
