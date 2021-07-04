import MediaGridImageView from "@components/MediaGridImageView";
import Link from "next/link";
import { Fragment } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const { default: Empty } = require("@components/Svg/Empty");

const MediaGrid = ({ media }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Media
        </p>
      </div>
      {media.length < 1 ? (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
            <div className="mt-3">
              <Link href="/admin/media/upload">
                <a className="flex border-2 rounded px-5 py-3 dark:border-gradient-1-start border-gradient-4-start dark:text-gradient-1-start text-gradient-4-start uppercase font-medium justify-center items-center transition-colors duration-300 hover:text-yellow-800 dark:hover:bg-gradient-1-start hover:bg-gradient-4-start">
                  <FaCloudUploadAlt className="mr-2 text-xl" />
                  Upload some images
                </a>
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-around justify-items-stretch gap-4 relative">
            {media.map((item) => (
              <Fragment>
                <MediaGridImageView image={item} />
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGrid;
