import Link from "next/link";
import { Fragment } from "react";

const { default: Empty } = require("@components/Svg/Empty");
const { BiPlus } = require("react-icons/bi");

const ProjectsGrid = ({ projects }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Projects
        </p>
      </div>
      {projects.length < 1 ? (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
            <div className="mt-3">
              <Link href="/admin/projects/new">
                <a className="flex border-2 rounded px-5 py-3 border-primary text-primary uppercase font-medium justify-center items-center transition-colors duration-300 hover:text-white hover:bg-primary">
                  <BiPlus className="mr-2 text-xl" />
                  Add new project
                </a>
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProjectsGrid;
