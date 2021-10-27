import DonationsBox from "@components/Donate/DonationsBox";
import DonationsTable from "@components/Donate/DonationsTable";
import PollsBox from "@components/Poll/PollsBox";
import ProfileCard from "@components/ProfileCard";
import Empty from "@components/Svg/Empty";
import { Fragment } from "react";

const UserInfo = ({ userData, userRecord, donations, polls }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-600">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          User Info
        </p>
      </div>
      {!userData ? (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
            <div className="mt-3">
              <a className="flex px-5 py-3 dark:text-gradient-1-start text-gradient-4-start uppercase font-medium justify-center items-center">
                User not found!
              </a>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700">
            <div className="max-w-3xl">
              <ProfileCard userRecord={userRecord} userData={userData} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UserInfo;
