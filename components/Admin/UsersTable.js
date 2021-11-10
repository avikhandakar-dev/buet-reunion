import Avatar from "@components/Avatar";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";

const UsersTable = ({ users, category, isOpen = false, buttonClass }) => {
  return (
    <>
      {users.length > 0 && (
        <div className="flex flex-col">
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
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                                >
                                  Name
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
                              {users.map((user, idx) => (
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
                        </Disclosure.Panel>
                      </Transition>
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
