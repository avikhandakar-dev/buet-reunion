import Avatar from "@components/Avatar";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import Pagination from "@components/Pagination";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { TiExportOutline } from "react-icons/ti";

const orderBy = (data, value, direction) => {
  if (direction === "asc") {
    return [...data].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...data].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return data;
};
const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className="">
        <FiArrowDown />
      </div>
    );
  } else {
    return (
      <div className="">
        <FiArrowUp />
      </div>
    );
  }
};

const UsersTable = ({ users, category, isOpen = false, buttonClass }) => {
  const [direction, setDirection] = useState("asc");
  const [orderedBy, setOrderedBy] = useState("displayName");
  const orderedUsers = orderBy(users, orderedBy, direction);
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

  const downloadAsText = (str) => {
    const element = document.createElement("a");
    const file = new Blob([str], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Emails.txt";
    document.body.appendChild(element);
    element.click();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPage = Math.ceil(users.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginateFront = () =>
    setCurrentPage(currentPage >= totalPage ? totalPage : currentPage + 1);
  const paginateBack = () =>
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  const paginateFirst = () => setCurrentPage(1);
  const paginateLast = () => setCurrentPage(totalPage);

  const CSVData = users.map((user) => {
    const {
      uid,
      disabled,
      metadata,
      passwordHash,
      passwordSalt,
      customClaims,
      tokensValidAfterTime,
      providerData,
      emailVerified,
      photoURL,
      ...filteredObj
    } = user;
    return filteredObj;
  });
  const getEmails = () => {
    const emails = users.map((user) => user.email);
    return emails;
  };
  return (
    <>
      {users.length > 0 && (
        <div className="flex flex-col relative">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-800 rounded-md">
                <Disclosure defaultOpen={isOpen}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={`${buttonClass}`}>
                        {category} - {users.length}
                        <FaChevronUp
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 duration-300`}
                        />
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        enter="transition duration-300 ease-out origin-top"
                        enterFrom="transform scale-y-95 opacity-0"
                        enterTo="transform scale-y-100 h-auto opacity-100"
                        leave="transition duration-75 ease-out origin-top"
                        leaveFrom="transform scale-y-100 opacity-100"
                        leaveTo="transform scale-y-95 opacity-0"
                      >
                        <Disclosure.Panel>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-600">
                              <tr>
                                <th
                                  onClick={() =>
                                    setValueAndDirection("displayName")
                                  }
                                  scope="col"
                                  className="px-6 py-3 flex items-center cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                  Name
                                  {orderedBy === "displayName" && (
                                    <SortArrow direction={direction} />
                                  )}
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                  Join Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                  Role
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-800">
                              {currentItems.map((user, idx) => (
                                <tr key={idx}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <Avatar
                                          user={user}
                                          extraClasses="bg-gray-200 dark:bg-gray-600"
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                          <Link
                                            href={`/admin/users/${user.uid}`}
                                          >
                                            <a>{user.displayName}</a>
                                          </Link>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                          {user.email}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                      {user.metadata.creationTime}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {user.department}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Active
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {category == "Registered Users"
                                      ? "Normal"
                                      : category}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/users/${user.uid}`}>
                                      <a className="text-green-500 hover:text-sky text-xl">
                                        <BsEyeFill />
                                      </a>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={users.length}
                            paginateBack={paginateBack}
                            paginateFront={paginateFront}
                            paginateFirst={paginateFirst}
                            paginateLast={paginateLast}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            setItemsPerPage={(num) => setItemsPerPage(num)}
                          />
                        </Disclosure.Panel>
                      </Transition>
                      {category == "Members" && open && (
                        <div className="flex justify-center items-center py-2 border-2 border-gray-100 dark:border-gray-600">
                          <CSVLink filename={`${category}.csv`} data={CSVData}>
                            <button className="font-medium text-primaryDark border-2 border-primaryDark px-4 py-1 rounded duration-300 flex items-center space-x-2 hover:text-white hover:bg-primaryDark">
                              Export CSV
                              <TiExportOutline className="text-xl" />
                            </button>
                          </CSVLink>
                          <button
                            onClick={() => downloadAsText(getEmails().join())}
                            className="font-medium text-primary border-2 border-primary rounded px-4 py-1 ml-8 duration-300 flex items-center space-x-2 hover:text-white hover:bg-primary"
                          >
                            Export Text (Emails)
                            <TiExportOutline className="text-xl" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersTable;
