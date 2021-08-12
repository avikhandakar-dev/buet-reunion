import Link from "next/link";
import { Fragment } from "react";
import { FaFacebook, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ResultsSidebar = ({ poll }) => {
  return (
    <Fragment>
      <Link href={`/poll/${poll.id}`}>
        <a className="flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-primary hover:bg-sky focus:shadow-outline focus:outline-none">
          <span className="mr-3">Submit your vote</span>
        </a>
      </Link>
      <div className="rounded my-3 bg-gray-50 dark:bg-gray-800 p-5 w-full">
        <div className="border-gray-200 dark:border-gray-600 border-b-2  mb-5 pb-3">
          <p className="text-muted font-semibold">Votes</p>
          <h1 className="font-semibold text-5xl">{poll.totalVotes}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-muted font-semibold">Share : </p>
          <a className="text-blue-500">
            <FaTwitter />
          </a>
          <a className="text-blue-800">
            <FaFacebookF />
          </a>
          <a className="text-green-500">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default ResultsSidebar;
