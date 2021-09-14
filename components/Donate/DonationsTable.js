import { Fragment } from "react";
import DonationsTableRow from "@components/Donate/DonationsTableRow";
import Empty from "@components/Svg/Empty";

const DonationsTable = ({ donations }) => {
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Donations
        </p>
      </div>
      {donations.length < 1 ? (
        <Fragment>
          <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
            <Empty width={150} className="text-gray-600 dark:text-gray-200" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 dark:border-gray-800">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Project
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Donor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Payment Method
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-800">
                      {donations.map((donation, idx) => (
                        <Fragment key={idx}>
                          <DonationsTableRow donation={donation} />
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DonationsTable;
