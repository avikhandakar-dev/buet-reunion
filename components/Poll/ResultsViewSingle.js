import { serverTimestampToString } from "@lib/healper";
import ResultsSidebar from "./ResultsSidebar";

const ResultsViewSingle = ({ poll, expired }) => {
  return (
    <div className="pt-16 lg:pt-24">
      <div className="flex flex-col space-y-2 mb-8">
        <div className="uppercase w-max text-xs font-medium rounded-md px-2 py-1 bg-green-300 text-green-900">
          {poll.category}
        </div>
        <h1 className="text-4xl flex space-x-4 flex-wrap font-semibold text-gray-700 dark:text-gray-200">
          {poll.questions?.[0].text}
        </h1>
        <p>
          <span className="text-gray-400 dark:text-gray-500">Asked by</span>{" "}
          {poll.userName}{" "}
          <span className="text-gray-400 dark:text-gray-500">
            on {serverTimestampToString(poll.createdAt)}
          </span>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-16">
        <div className="flex-1 flex-grow">
          {(poll.category == "election" && expired) || !poll.active ? (
            <>
              {poll.options.map((option) => (
                <div
                  className="w-full rounded p-5 shadow-menu mb-6 bg-white dark:bg-gray-800"
                  key={option.id}
                >
                  <div className="flex justify-between">
                    <p className="font-semibold text-2xl">{option.text}</p>
                    <p className="font-semibold text-2xl">
                      {poll.votes[option.id] > 0
                        ? Math.round(
                            // (poll.votes[option.id] / poll.totalVotes) * 100
                            (poll.votes[option.id] / poll.voters.length) * 100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                  <div className="w-full relative rounded-full h-2 my-5 bg-gray-100">
                    <div
                      style={{
                        width: `${
                          poll.votes[option.id] > 0
                            ? Math.round(
                                // (poll.votes[option.id] / poll.totalVotes) * 100
                                (poll.votes[option.id] / poll.voters.length) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                      className="absolute inset-0 h-full bg-primary rounded-full transition-all duration-500"
                    />
                  </div>
                  <p className="text-muted text-sm">
                    {poll.votes[option.id]} Votes
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full h-96 p-8 mb-8 bg-gray-50 dark:bg-gray-700 flex justify-center items-center rounded-2xl">
              <p>Sorry you can't see results until voting is closed!</p>
            </div>
          )}
        </div>
        <div className="lg:w-80 w-full flex-shrink-0">
          <ResultsSidebar poll={poll} />
        </div>
      </div>
    </div>
  );
};

export default ResultsViewSingle;
