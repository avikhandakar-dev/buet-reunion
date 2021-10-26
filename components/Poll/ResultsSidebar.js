import Link from "next/link";
import { Fragment } from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase";
import LoadingScreen from "@components/LoadingScreen";
const ResultsSidebar = ({ poll }) => {
  const [user, userIsLoading] = useAuthState(auth);
  if (userIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <Fragment>
      {poll.voters?.includes(user?.email) ? (
        <div className="w-full py-3 px-6 font-medium tracking-wide text-blue-700 dark:text-blue-300 rounded shadow-md md:w-auto bg-blue-200 dark:bg-blue-700">
          You voted on this poll
        </div>
      ) : (
        <Link href={`/poll/${poll.id}`}>
          <a className="flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-primary hover:bg-sky focus:shadow-outline focus:outline-none">
            <span className="mr-3">Submit your vote</span>
          </a>
        </Link>
      )}

      <div className="rounded my-3 bg-gray-50 dark:bg-gray-800 p-5 w-full">
        <div className="mb-5 pb-3">
          <p className="text-muted font-semibold">Voters</p>
          <h1 className="font-semibold text-5xl">{poll.voters?.length || 0}</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default ResultsSidebar;
