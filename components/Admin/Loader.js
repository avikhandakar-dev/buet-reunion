import { Fragment } from "react";
import { CgSpinner } from "react-icons/cg";

const LoaderAdmin = ({ title }) => {
  return (
    <Fragment>
      <div className="rounded-md shadow overflow-hidden relative px-6 lg:px-10 -mt-24">
        <div className="py-4 px-5 bg-white dark:bg-gray-700">
          <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
            {title}
          </p>
        </div>
        <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
          <span className="inline-flex text-5xl animate-spin text-primary">
            <CgSpinner />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default LoaderAdmin;
