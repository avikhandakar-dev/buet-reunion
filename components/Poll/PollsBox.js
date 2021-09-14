import Empty from "@components/Svg/Empty";
import { Fragment } from "react";
import PollsBoxRow from "./PollsBoxRow";

const PollsBox = ({ polls }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-3 px-5 bg-gray-100 dark:bg-gray-800 border-b-2 dark:border-gray-700 border-gray-200">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Polls
        </p>
      </div>
      {polls.length < 1 ? (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-600 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-wrap space-x-4 bg-gray-50 dark:bg-gray-800 p-4">
            {polls.map((poll, idx) => (
              <Fragment key={idx}>
                <PollsBoxRow poll={poll} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PollsBox;
