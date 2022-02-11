import { BsEyeFill } from "react-icons/bs";
import Link from "next/dist/client/link";
import Avatar from "./Avatar";
import { AiFillPicture } from "react-icons/ai";
import Image from "next/image";
import { serverTimestampToString } from "@lib/healper";
import MemberCard from "@components/MemberCard";
import { useState, Fragment } from "react";

const MembersTable = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalShow, setIsModalShow] = useState(true);
  return (
    <Fragment>
      <div className="w-full overflow-x-auto shadow-md rounded-md">
        <table className="divide-y divide-gray-200 dark:divide-gray-800 w-full">
          <thead className="bg-gray-50 dark:bg-gray-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 flex items-center text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
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
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
              >
                State
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
              >
                Class Begins
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-800">
            {members.map((user, idx) => (
              <tr key={idx}>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    setSelectedMember(user);
                    setIsModalShow(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative overflow-hidden rounded-full h-12 w-12 bg-gray-100 dark:bg-gray-900">
                      {user.profile?.avatar ? (
                        <Image
                          placeholder="blur"
                          blurDataURL={user.profile.avatar.loaderDownloadUrl}
                          src={user.profile.avatar.oriDownloadUrl}
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : user.authData.photoURL ? (
                        <Image
                          src={user.authData.photoURL}
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <span className="w-full h-full flex justify-center items-center text-bold rounded-full text-gray-700 dark:text-gray-300 text-lg">
                          <p className={`font-medium uppercase`}>
                            {user?.authData.displayName?.substring(0, 2)}
                          </p>
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        <Link href={`/admin/users/${user.uid}`}>
                          <a>{user.displayName}</a>
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.authData.displayName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {serverTimestampToString(
                      user.authData.metadata.creationTime
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{user.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.profile?.country || "US"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                  {user.profile?.state || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.profile?.department || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.profile?.CBB || "-"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    onClick={() => {
                      setSelectedMember(user);
                      setIsModalShow(true);
                    }}
                    className="text-green-500 hover:text-sky text-xl"
                  >
                    <BsEyeFill />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMember && (
        <MemberCard
          member={selectedMember}
          isModalShow={isModalShow}
          close={() => setIsModalShow(false)}
        />
      )}
    </Fragment>
  );
};

export default MembersTable;
