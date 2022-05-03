import { Fragment, useState } from "react";
import DonationsTableRow from "@components/Donate/DonationsTableRow";
import Empty from "@components/Svg/Empty";
import Pagination from "@components/Pagination";
import { orderBy, SortArrow } from "@components/Admin/UsersTable";

const DonationsTable = ({
  donations,
  noTitle = false,
  transparentBody = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [direction, setDirection] = useState("desc");
  const [orderedBy, setOrderedBy] = useState("");

  const orderedDonations = orderBy(donations, orderedBy, direction);

  const filteredDonations = orderedDonations.filter((donation) => {
    if (
      donation.donorInfo?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.donorInfo?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${donation.amount}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return donation;
    }
  });

  const switchDirection = () => {
    if (direction == "asc") {
      setDirection("desc");
    } else {
      setDirection("asc");
    }
  };
  const setValueAndDirection = (value) => {
    setOrderedBy(value);
    switchDirection();
  };

  const totalPage =
    Math.ceil((filteredDonations || donations).length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (filteredDonations || donations).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginateFront = () =>
    setCurrentPage(currentPage >= totalPage ? totalPage : currentPage + 1);
  const paginateBack = () =>
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  const paginateFirst = () => setCurrentPage(1);
  const paginateLast = () => setCurrentPage(totalPage);

  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 px-5 bg-white dark:bg-gray-700">
        {!noTitle && (
          <div className="">
            <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
              Donations
            </p>
          </div>
        )}
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          value={searchTerm}
          type="search"
          name="search"
          className="max-w-xs bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-400 focus:ring-0 focus:border-black dark:focus:border-primary"
          placeholder="Search..."
        />
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
                  <table
                    className={`min-w-full divide-y divide-gray-200 dark:divide-gray-800 ${
                      transparentBody &&
                      "border-2 border-gray-50 dark:border-gray-600"
                    }`}
                  >
                    <thead className="bg-gray-50 dark:bg-gray-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Project
                        </th>
                        <th
                          onClick={() => setValueAndDirection("amount")}
                          scope="col"
                          className="px-6 py-3 cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          <span className="flex items-center">
                            Amount{" "}
                            {orderedBy === "amount" && (
                              <span className="inline">
                                <SortArrow direction={direction} />
                              </span>
                            )}
                          </span>
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
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                        >
                          Receipt
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y divide-gray-200 dark:divide-gray-800 ${
                        transparentBody
                          ? "bg-transparent"
                          : "bg-white dark:bg-gray-700"
                      }`}
                    >
                      {currentItems.map((donation, idx) => (
                        <Fragment key={idx}>
                          <DonationsTableRow donation={donation} />
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={(filteredDonations || donations).length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              paginateFirst={paginateFirst}
              paginateLast={paginateLast}
              currentPage={currentPage}
              totalPage={totalPage}
              setItemsPerPage={(num) => setItemsPerPage(num)}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DonationsTable;
