import { firestore } from "@lib/firebase";
import { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import Empty from "@components/Svg/Empty";
import Container from "@components/Container";
import PollBar from "@components/Poll/PollBar";
import { useEffect } from "react";
import LoadingScreen from "@components/LoadingScreen";

const PollsPage = () => {
  const [polls = [], loading, error] = useCollectionData(
    firestore
      .collection("polls")
      .where("public", "==", true)
      .orderBy("createdAt", "desc")
  );

  return <LoadingScreen />;

  return (
    <Fragment>
      {loading && (
        <>
          <div className="max-w-7xl mx-auto flex justify-center items-center mb-32 h-screen">
            <span className="inline-flex text-5xl animate-spin text-primary">
              <CgSpinner />
            </span>
          </div>
        </>
      )}
      {!loading && polls.length < 1 && (
        <>
          <div className="mb-32 px-5 flex flex-col justify-center items-center h-screen">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
          </div>
        </>
      )}
      {!loading && polls.length >= 1 && (
        <>
          <Container maxWidth="max-w-4xl">
            <div className="pt-16 lg:pt-24 mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-black md:text-6xl xl:text-7xl">
                  Polls
                </h1>
                <p className="text-gray-500 text-lg">
                  Below are the public polls created by Buetian's
                </p>
              </div>
              <div>
                <select
                  // onChange={(event) => setVisibility(event.target.value)}
                  className="w-full rounded shadow-input focus:outline-none bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                  name="pollVisibility"
                  required={true}
                >
                  <option value="recent" selected>
                    Recent
                  </option>
                  <option value="popular">Popular</option>
                  <option value="active">Open to Voting</option>
                </select>
              </div>
            </div>
            <div className="flex space-y-12 flex-col w-full mt-16">
              {polls.map((poll) => (
                <PollBar poll={poll} />
              ))}
            </div>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default PollsPage;
