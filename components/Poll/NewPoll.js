import { Spin } from "@components/Svg/Spin";
import AuthContext from "@lib/authContext";
import firebase, { firestore, serverTimestamp } from "@lib/firebase";
import { fetchPostJSON } from "@lib/healper";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin5Line, RiQuestionFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const NewPoll = () => {
  const defaultQuestion = [{ id: nanoid(), text: "" }];
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [pollQuestions, setPollQuestions] = useState(defaultQuestion);
  const [pollOptions, setPollOptions] = useState([]);
  const [category, setCategory] = useState("general");
  const [whiteList, setWhiteList] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [isLoading, setIsLoading] = useState(false);
  const [access, setAccess] = useState("members");

  const addQuestion = () => {
    setPollQuestions((questions) => {
      return [...questions, { id: nanoid(), text: "" }];
    });
  };
  const removeQuestion = (id) => {
    setPollQuestions((questions) => {
      return questions.filter((question) => question.id !== id);
    });
    setPollOptions((options) => {
      return options.filter((option) => option.questionId !== id);
    });
  };
  const updateQuestion = (id, text) => {
    setPollQuestions((questions) => {
      let updatedPollQuestions = [];
      let pollIndex = questions.findIndex((val) => val.id === id);
      updatedPollQuestions = [
        ...questions.slice(0, pollIndex),
        {
          id,
          text,
        },
        ...questions.slice(pollIndex + 1),
      ];
      return updatedPollQuestions;
    });
  };
  const addOption = (questionId) => {
    setPollOptions((options) => {
      return [...options, { id: nanoid(), questionId, text: "" }];
    });
  };
  const removeOption = (id) => {
    setPollOptions((options) => {
      return options.filter((option) => option.id !== id);
    });
  };
  const updateOption = (id, questionId, text) => {
    setPollOptions((options) => {
      let updatedPollOptions = [];
      let pollIndex = options.findIndex((val) => val.id === id);
      updatedPollOptions = [
        ...options.slice(0, pollIndex),
        {
          id,
          questionId,
          text,
        },
        ...options.slice(pollIndex + 1),
      ];
      return updatedPollOptions;
    });
  };
  const createVotes = () => {
    let votes = {};
    pollOptions.map((option) => (votes[option.id] = 0));
    return votes;
  };
  const createEmailList = () => {
    return whiteList.replace(/\s/g, "").split(",");
  };

  const sendMail = async (pollId) => {
    const token = await user?.getIdToken();
    const response = await fetchPostJSON("/api/mail/new-poll", {
      token: token,
      emails: createEmailList(),
      title: pollQuestions[0].text,
      pollId,
    });
    if (response.statusCode === 200) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const pollId = nanoid();
    const batch = firestore.batch();
    const pollRef = firestore.collection("polls").doc(pollId);
    const aggregationRef = firestore.collection("aggregations").doc("polls");
    try {
      batch.set(pollRef, {
        questions: pollQuestions,
        options: pollOptions,
        category,
        public: visibility == "private" ? false : true,
        active: true,
        totalVotes: 0,
        id: pollId,
        votes: createVotes(),
        voters: [],
        access: access,
        userId: user?.uid,
        userName: user?.displayName,
        userEmail: user?.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...(access == "emails" && {
          whiteList: whiteList.replace(/\s/g, "").split(","),
        }),
      });
      batch.update(aggregationRef, {
        total: firebase.firestore.FieldValue.increment(1),
      });
      await batch.commit();
      if (access == "emails") {
        await sendMail(pollId);
      }
      toast.success("Poll created successfully!", {
        duration: 4000,
      });
      router.push("/admin/polls");
    } catch (error) {
      toast.error(error.message);
      return setIsLoading(false);
    }
  };
  return (
    <div className="rounded-md shadow relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700 relative">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Add new poll
        </p>
      </div>
      <div className="py-4 px-5 relative bg-gray-50 dark:bg-gray-700 flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto w-full">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="flex xl:space-x-8 space-y-8 xl:space-y-0 flex-col xl:flex-row">
              <div className="flex-1 flex-grow space-y-8">
                {pollQuestions.map((question, index) => (
                  <div key={question.id} className="relative">
                    <div className="mb-2">
                      <div className=" text-gray-500 border-b-2 border-gray-200 dark:border-gray-500 pb-1 text-xl dark:text-gray-200 font-semibold mb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            Question {index + 1}
                            <span className="ml-1 text-green-500">
                              <RiQuestionFill />
                            </span>
                          </div>
                          {pollQuestions.length > 1 && (
                            <a
                              className=" text-red-500 italic cursor-pointer pr-2"
                              onClick={() => removeQuestion(question.id)}
                            >
                              <RiDeleteBin5Line />
                            </a>
                          )}
                        </div>
                      </div>
                      <textarea
                        required={true}
                        maxLength={1000}
                        onChange={(event) =>
                          updateQuestion(question.id, event.target.value)
                        }
                        name="title"
                        placeholder="Eg. What is your favourite color?"
                        className="block h-20 shadow-input dark:placeholder-gray-400 rounded-md w-full border bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                      ></textarea>
                    </div>
                    {pollOptions
                      .filter((item) => item.questionId === question.id)
                      .map((option, index) => (
                        <div key={option.id} className="relative mb-2">
                          <p className=" text-gray-500 dark:text-gray-200 font-medium">
                            Option
                          </p>
                          <div className="flex rounded shadow-input">
                            <input
                              type="text"
                              onChange={(event) =>
                                updateOption(
                                  option.id,
                                  question.id,
                                  event.target.value
                                )
                              }
                              required={true}
                              maxLength={1000}
                              placeholder={`Eg. Option ${index + 1}`}
                              name={`option${index + 1}`}
                              className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2 focus:outline-none"
                            />
                            {pollOptions.filter(
                              (item) => item.questionId === question.id
                            ).length > 2 ? (
                              <button
                                className="text-2xl absolute right-0 top-1/2 text-yellow-400 pr-2"
                                type="button"
                                onClick={() => removeOption(option.id)}
                              >
                                <TiDelete />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    <button
                      onClick={() => addOption(question.id)}
                      type="button"
                      className="flex items-center justify-center  px-6 py-3 mt-6 font-medium text-yellow-900 transition duration-500 ease-in-out transform bg-yellow-300 rounded hover:bg-yellow-200 hover:to-black focus:outline-none"
                    >
                      Add new option{" "}
                      <span className="text-white pl-3">
                        <FaPlus />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              <div
                className="xl:w-80 w-full flex-shrink-0 shadow-md sticky top-4"
                style={{ height: "max-content" }}
              >
                <div className="font-medium bg-green-300 text-green-900 rounded-t-md px-4 py-2">
                  Settings
                </div>
                <div className="bg-green-50 dark:bg-gray-800 p-4">
                  <button
                    onClick={() => addQuestion()}
                    type="button"
                    className="flex items-center justify-center px-6 py-2 font-medium text-yellow-500 border-yellow-500 border-2 rounded-full transition duration-500 ease-in-out transform hover:bg-yellow-100 dark:hover:bg-gray-600 focus:outline-none"
                  >
                    Add another question{" "}
                    <span className="text-yellow-600 text-xs pl-2">
                      <FaPlus />
                    </span>
                  </button>
                  <div className="mt-3 rounded">
                    <p className=" text-gray-500 dark:text-gray-200 font-medium mb-1">
                      Poll category
                    </p>
                    <select
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full focus:outline-none bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                      name="pollCategory"
                      required={true}
                    >
                      <option value="animals">Animals</option>
                      <option value="art">Art</option>
                      <option value="books">Books</option>
                      <option value="colour">Colour</option>
                      <option value="crypto">Crypto</option>
                      <option value="days">Days</option>
                      <option value="drink">Drink</option>
                      <option value="food">Food</option>
                      <option value="gaming">Gaming</option>
                      <option value="general" selected>
                        General
                      </option>
                      <option value="healthcare">Healthcare</option>
                      <option value="history">History</option>
                      <option value="investment">Investment</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="movies">Movies</option>
                      <option value="music">Music</option>
                      <option value="news">News</option>
                      <option value="politics">Politics</option>
                      <option value="random">Random</option>
                      <option value="science">Science</option>
                      <option value="social">Social</option>
                      <option value="sport">Sport</option>
                      <option value="startup">Startup</option>
                      <option value="tv">Tv</option>
                      <option value="web-design">Web Design</option>
                      <option value="web-development">Web Development</option>
                      <option value="week">Week</option>
                    </select>
                  </div>
                  <div className="mt-3 rounded">
                    <p className=" text-gray-500 dark:text-gray-200 font-medium mb-1">
                      Poll visibility
                    </p>
                    <select
                      onChange={(event) => setVisibility(event.target.value)}
                      className="w-full focus:outline-none bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                      name="pollVisibility"
                      required={true}
                    >
                      <option value="private" selected>
                        Private
                      </option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                  <div className="mt-3 rounded">
                    <p className=" text-gray-500 dark:text-gray-200 font-medium mb-1">
                      Who can vote
                    </p>
                    <select
                      onChange={(event) => setAccess(event.target.value)}
                      className="w-full focus:outline-none bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                      name="pollVisibility"
                      required={true}
                    >
                      <option value="members" selected>
                        Only Members
                      </option>
                      <option value="emails">By Email</option>
                    </select>
                  </div>

                  {access == "emails" && (
                    <div className="mt-3 rounded">
                      <p className=" text-gray-500 dark:text-gray-200 font-medium mb-1">
                        Emails
                      </p>
                      <textarea
                        onChange={(event) => setWhiteList(event.target.value)}
                        value={whiteList}
                        className="w-full dark:placeholder-gray-400 focus:outline-none bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                        name="emails"
                        rows="5"
                        placeholder="Separate email with commas"
                        required={true}
                      />
                    </div>
                  )}

                  <div className="mt-3">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="inline-flex items-center justify-center  px-6 py-3 my-3 font-semibold text-white transition duration-500 ease-in-out transform bg-green-500 rounded hover:bg-green-400 focus:outline-none focus:ring-2 "
                    >
                      {isLoading ? (
                        <span className="inline-flex">
                          <Spin />
                          Please wait
                        </span>
                      ) : (
                        "Create Your Poll"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPoll;
