import { serverTimestampToString } from "@lib/healper";
import { MdCheckCircle, MdEmail, MdRadioButtonUnchecked } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { useState } from "react";

const VoteViewSingle = ({ poll }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleSelected = (id) => {
    setSelectedOptions((options) => {
      if (poll.allowMultiSelect) {
        if (selectedOptions.includes(id)) {
          return options.filter((option) => option !== id);
        } else {
          return [...options, id];
        }
      } else {
        return [id];
      }
    });
  };
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
      <div className="">
        <div>
          {poll.allowMultiSelect && (
            <p className="font-semibold text-muted mb-5 text-sm">
              You can choose multiple options
            </p>
          )}
          {poll.options.map((option) => (
            <div
              onClick={() => toggleSelected(option.id)}
              className={`w-full cursor-pointer transform transition-all rounded p-5 shadow-menu mb-6 bg-white dark:bg-gray-800 ${
                selectedOptions.includes(option.id)
                  ? "border-2 border-primary"
                  : "hover:shadow-xl hover:scale-105"
              }`}
              key={option.id}
            >
              <p className="font-semibold text-2xl inline-flex justify-center items-center">
                <span className="mr-3">
                  {selectedOptions.includes(option.id) ? (
                    <i className="text-primary">
                      <MdCheckCircle />
                    </i>
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                </span>{" "}
                {option.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between items-center md:flex-row mt-10">
          <button
            disabled={selectedOptions.length < 1}
            onClick={() => voteSumited()}
            className="cursor-pointer inline-flex items-center justify-center w-full py-4 px-6 mb-3 font-medium tracking-wide transition duration-200 rounded shadow-md md:w-auto md:mb-0  focus:shadow-outline focus:outline-none bg-primary hover:bg-sky text-white"
          >
            {isLoading ? (
              <span className="inline-flex">
                <SpinWhite />
                Please wait
              </span>
            ) : (
              "Submit your vote"
            )}
          </button>
          <Link href={`/poll/results/${poll.id}`}>
            <a className="font-semibold text-muted inline-flex items-center justify-center">
              Jump to result{" "}
              <span className="text-2xl">
                <BiChevronRight />
              </span>
            </a>
          </Link>
        </div>
        <div className="my-10 py-3 border-t-2 border-gray-100 dark:border-gray-700">
          <div className="inline-flex justify-center items-center">
            <p className="text-muted font-semibold mr-3">Share</p>
            {/* {SocialLinks.map((link) => (
                    <a
                      key={link.name}
                      style={{ color: link.color }}
                      href={link.url}
                      target="_blank"
                      className="inline-flex justify-center items-center my-2"
                    >
                      <span className="mr-3">{link.icon}</span>
                    </a>
                  ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteViewSingle;
