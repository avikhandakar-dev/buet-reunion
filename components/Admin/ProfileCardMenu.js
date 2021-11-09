import { Menu, Transition, Popover } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect } from "react";
import { BsGearFill } from "react-icons/bs";
import { ImPower } from "react-icons/im";
import { RiMailSendFill, RiPieChart2Fill } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import { FaUser, FaUserAltSlash } from "react-icons/fa";
import ConfirmModal from "@components/Confirm";
import AuthContext from "@lib/authContext";
import { fetchPostJSON } from "@lib/healper";
import toast from "react-hot-toast";

const ProfileCardMenu = ({ userRecord }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);

  const changeRole = async (role = "member", revoke = false) => {
    setIsLoading(true);
    setProcessFinished(false);
    const token = await user?.getIdToken();
    const response = await fetchPostJSON("/api/users/set-role", {
      uid: userRecord.uid,
      token: token,
      role,
      revoke,
    });
    if (response.statusCode === 200) {
      toast.success("Success!");
      setIsLoading(false);
      setProcessFinished(true);
    } else {
      toast.error(response.message);
      setIsLoading(false);
      setProcessFinished(true);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left mt-1">
      <Menu.Button className="text-2xl md:text-3xl text-pink-500">
        <a>
          <BsGearFill />
        </a>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          unmount={false}
          className="absolute p-2 right-0  mt-2 origin-top-right bg-white bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md saturate-150 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-right"
        >
          {!userRecord.customClaims?.admin ? (
            <Menu.Item>
              {({ active }) => (
                <ConfirmModal
                  actionButtonTitle="Yes"
                  type="warning"
                  body={`You want to promote ${userRecord.displayName} to admin?`}
                  buttonIcon={
                    <button
                      className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                    >
                      Make admin
                      <span className="ml-2" aria-hidden="true">
                        <ImPower />
                      </span>
                    </button>
                  }
                  action={() => {
                    changeRole("admin", false);
                  }}
                  isLoading={isLoading}
                  processFinished={processFinished}
                />
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <ConfirmModal
                  actionButtonTitle="Yes"
                  type="warning"
                  body={`You want to remove ${userRecord.displayName} from admin?`}
                  buttonIcon={
                    <button
                      className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                    >
                      Remove admin privileges
                      <span className="ml-2" aria-hidden="true">
                        <ImPower />
                      </span>
                    </button>
                  }
                  action={() => {
                    changeRole("admin", true);
                  }}
                  isLoading={isLoading}
                  processFinished={processFinished}
                />
              )}
            </Menu.Item>
          )}
          {/* <Menu.Item>
            {({ active }) => (
              <button
                className={`group flex truncate font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
              >
                Request profile completion
                <span className="ml-2" aria-hidden="true">
                  <RiMailSendFill />
                </span>
              </button>
            )}
          </Menu.Item> */}

          {userRecord.customClaims?.member ? (
            <Menu.Item>
              {({ active }) => (
                <ConfirmModal
                  actionButtonTitle="Yes"
                  type="warning"
                  body={`You want to promote ${userRecord.displayName} to admin?`}
                  buttonIcon={
                    <button
                      className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                    >
                      Revoked membership
                      <span className="ml-2" aria-hidden="true">
                        <FaUserAltSlash />
                      </span>
                    </button>
                  }
                  action={() => {
                    changeRole("member", true);
                  }}
                  isLoading={isLoading}
                  processFinished={processFinished}
                />
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <ConfirmModal
                  actionButtonTitle="Yes"
                  type="warning"
                  body={`You want to remove ${userRecord.displayName} from admin?`}
                  buttonIcon={
                    <button
                      className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                    >
                      Accept membership
                      <span className="ml-2" aria-hidden="true">
                        <FaUser />
                      </span>
                    </button>
                  }
                  action={() => {
                    changeRole("member", false);
                  }}
                  isLoading={isLoading}
                  processFinished={processFinished}
                />
              )}
            </Menu.Item>
          )}

          {/* <Menu.Item>
            {({ active }) => (
              <ConfirmModal
                body={`You want to delete ${userRecord.displayName}? This process cannot be undone.`}
                buttonIcon={
                  <button
                    className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                  >
                    Delete user
                    <span className="ml-2" aria-hidden="true">
                      <IoTrashOutline />
                    </span>
                  </button>
                }
                action={() => {
                  true;
                }}
                isLoading={isLoading}
                processFinished={processFinished}
              />
            )}
          </Menu.Item> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileCardMenu;
