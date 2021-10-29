import { timestampToString } from "@lib/healper";
import Link from "next/link";
import { BiUpvote } from "react-icons/bi";

export const Colors = [
  "text-yellow-900 bg-yellow-400 dark:bg-yellow-300",
  "text-green-900 bg-green-400 dark:bg-green-300",
  "text-blue-900 bg-blue-400 dark:bg-blue-300",
  "text-indigo-900 bg-indigo-400 dark:bg-indigo-300",
  "text-purple-900 bg-purple-400 dark:bg-purple-300",
  "text-pink-900 bg-pink-400 dark:bg-pink-300",
  "text-red-900 bg-red-400 dark:bg-red-300",
];
const PollsBoxRow = ({ poll, idx }) => {
  const index = idx % Colors.length;
  return (
    <Link href={`/poll/results/${poll.id}`}>
      <a>
        <div
          className={`rounded-md w-36 h-36 relative py-2 px-4 ${Colors[index]}`}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className="text-xl flex items-center">
              <BiUpvote />
              <p>{poll.totalVotes}</p>
            </div>
            <div>
              <p className="line-clamp-3 leading-4 font-medium mb-1">
                {poll.questions?.[0].text}
              </p>
              <p className="line-clamp-1 text-xs">
                {timestampToString(poll.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PollsBoxRow;
