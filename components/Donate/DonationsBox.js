import Empty from "@components/Svg/Empty";
import { Fragment } from "react";
import DonationsBoxRow from "./DonationsBoxRow";

const DonationsBox = ({ donations }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-3 px-5 bg-pink-100 dark:bg-pink-600 border-b-2 border-pink-200 dark:border-pink-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Donations
        </p>
      </div>
      {donations.length < 1 ? (
        <Fragment>
          <div className="py-4 px-5 bg-pink-50 dark:bg-pink-600 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-pink-600 dark:text-pink-200" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col bg-pink-50 dark:bg-pink-600 divide-y divide-pink-100 dark:divide-pink-700">
            {donations.map((donation, idx) => (
              <Fragment key={idx}>
                <DonationsBoxRow donation={donation} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DonationsBox;
