import { fetchPostJSON, serverTimestampToString } from "@lib/healper";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@lib/authContext";
import toast from "react-hot-toast";
import { Spin } from "@components/Svg/Spin";
import { useRouter } from "next/router";

const VoteViewSingle = ({ poll }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { user } = useContext(AuthContext);
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

  useEffect(() => {
    const unsubs = async () => {
      if (!selectedOptions.length) {
        return;
      }
      if (poll.allowMultiSelect) {
        if (selectedOptions.length > poll.choicesLimit) {
          setSelectedOptions(selectedOptions.splice(1));
        }
      }
    };
    return unsubs();
  }, [selectedOptions]);

  const handelSubmit = async () => {
    if (!selectedOptions.length) {
      return toast.error("You must select an option!");
    }
    setIsLoading(true);
    const response = await fetchPostJSON("/api/poll/vote", {
      uid: user?.uid,
      poll,
      selectedOptions,
    });
    if (response.statusCode === 200) {
      toast.success(response.message, {
        duration: 4000,
      });
      setVoteSuccess(true);
      setIsLoading(false);
      return;
    } else {
      toast.error(response.message);
      setVoteSuccess(false);
      setIsLoading(false);
      return;
    }
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
      <div className="mb-4">
        <div>
          {poll.allowMultiSelect && (
            <p className="mb-5 text-gray-500">
              You can choose up to{" "}
              <span className="font-bold text-green-400">
                {poll.choicesLimit || 2}
              </span>{" "}
              options
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
        <div className="mt-10">
          {voteSuccess ? (
            <p className="py-3 px-6 w-max font-medium tracking-wide text-blue-700 dark:text-blue-300 rounded shadow-md bg-blue-200 dark:bg-blue-700">
              Thanks for your vote!
            </p>
          ) : (
            <button
              disabled={isLoading}
              onClick={() => handelSubmit()}
              className="cursor-pointer inline-flex items-center justify-center w-full py-4 px-6 mb-3 font-medium tracking-wide transition duration-200 rounded shadow-md md:w-auto md:mb-0  focus:shadow-outline focus:outline-none bg-primary hover:bg-sky text-white"
            >
              {isLoading ? (
                <span className="inline-flex">
                  <Spin />
                  Please wait
                </span>
              ) : (
                "Submit your vote"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteViewSingle;
