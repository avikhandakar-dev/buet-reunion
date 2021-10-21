import { serverTimestampToString } from "@lib/healper";
import Link from "next/link";
import { Fragment } from "react";

const PollBar = ({ poll }) => {
  return (
    <Fragment>
      <Link href={`/poll/${poll.id}`}>
        <a className="duration-300 hover:shadow-xl hover:-translate-y-2 ease-in-out">
          <div className="shadow-projectBar relative p-8 bg-white dark:bg-gray-800 rounded-md">
            <span className="rounded-full border-2 border-green-500 px-4 -translate-y-1/2 py-2 absolute right-0 top-0 -translate-x-4 shadow-md lg:-translate-x-1/2 font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {poll.totalVotes || 0} Votes
            </span>
            <div className="flex-col flex space-y-4">
              <div className="uppercase w-max text-xs font-medium rounded-md px-2 py-1 bg-green-300 text-green-900">
                {poll.category}
              </div>
              <div className="flex ">
                <h1 className="text-4xl flex space-x-4 flex-wrap font-semibold text-gray-700 dark:text-gray-200">
                  <span className="line-clamp-2">
                    {poll.questions?.[0].text}
                  </span>
                  {poll.questions.length > 1 && (
                    <span className="text-gray-300 dark:text-gray-600 text-4xl">
                      +{poll.questions.length - 1}
                    </span>
                  )}
                </h1>
              </div>
              <p className="text-lg text-gray-400 font-medium">
                {serverTimestampToString(poll.createdAt)}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Fragment>
  );
};

export default PollBar;
