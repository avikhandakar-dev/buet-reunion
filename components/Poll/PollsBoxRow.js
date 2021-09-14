import { randomColor, timestampToString } from "@lib/healper";
import Link from "next/link";
import { BiUpvote } from "react-icons/bi";
import { RiBarChart2Fill } from "react-icons/ri";

const PollsBoxRow = ({ poll }) => {
  const color = randomColor();
  return (
    <Link href={`/poll/results/${poll.id}`}>
      <a>
        <div
          className={`rounded-md w-36 h-36 relative py-2 px-4 ${color.bg} ${color.text}`}
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
