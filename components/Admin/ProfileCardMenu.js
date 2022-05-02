import { Menu, Transition, Popover } from "@headlessui/react";
import { Fragment, useContext, useState, useEffect } from "react";
import { BsGearFill } from "react-icons/bs";
import { ImPower } from "react-icons/im";
import { RiMailSendFill, RiPieChart2Fill } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import { FaUser, FaUserAltSlash } from "react-icons/fa";
import ConfirmModal from "@components/Confirm";
import AuthContext from "@lib/authContext";
import { fetchDeleteJSON, fetchPostJSON } from "@lib/healper";
import toast from "react-hot-toast";
import { deleteImage, firestore } from "@lib/firebase";
import { useRouter } from "next/router";

const ProfileCardMenu = ({ userRecord }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);

  const changeRole = async (role = "member", revoke = false) => {
    const msg = revoke
      ? `Are you sure you want to remove ${userRecord.displayName} from ${role}?`
      : `Are you sure you want to promote ${userRecord.displayName} as ${role}?`;
    const userAction = confirm(msg);
    if (userAction) {
      const Request = async () => {
        setIsLoading(true);
        const token = await user?.getIdToken();
        const response = await fetchPostJSON("/api/users/set-role", {
          uid: userRecord.uid,
          token: token,
          role,
          revoke,
        });
        if (response.statusCode === 200) {
          setIsLoading(false);
          setProcessFinished(true);
          return response.message;
        } else {
          setIsLoading(false);
          throw new Error(response.message);
        }
      };
      toast.promise(Request(), {
        loading: <b>Please wait...</b>,
        success: (data) => <b>{data}</b>,
        error: (err) => <b>{err.toString()}</b>,
      });
    }
  };

  const deleteUser = () => {
    const userAction = confirm(
      `Are you sure you want to delete ${userRecord.displayName}?`
    );
    if (userAction) {
      const Request = async () => {
        setIsLoading(true);
        const token = await user?.getIdToken();
        const response = await fetchDeleteJSON("/api/users/delete", {
          token,
          uid: userRecord.uid,
        });
        if (response.statusCode === 200) {
          const docRef = firestore.collection("users").doc(userRecord.uid);
          const snapData = await docRef.get();
          const userData = snapData.data();
          if (userData.avatar) {
            try {
              await deleteImage(userData.avatar);
              await docRef.delete();
            } catch (error) {}
          }
          setIsLoading(false);
          setProcessFinished(true);
          return response.message;
        } else {
          setIsLoading(false);
          throw new Error(response.message);
        }
      };
      toast.promise(Request(), {
        loading: <b>Please wait...</b>,
        success: (data) => <b>{data}</b>,
        error: (err) => <b>{err.toString()}</b>,
      });
    }
  };

  useEffect(() => {
    const unsubs = async () => {
      if (processFinished) {
        router.replace("/admin");
      }
    };
    return unsubs();
  }, [processFinished]);

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
                <button
                  onClick={() => changeRole("admin", false)}
                  className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                >
                  Make admin
                  <span className="ml-2" aria-hidden="true">
                    <ImPower />
                  </span>
                </button>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => changeRole("admin", true)}
                  className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                >
                  Revoke Adminship
                  <span className="ml-2" aria-hidden="true">
                    <ImPower />
                  </span>
                </button>
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
                <button
                  onClick={() => changeRole("member", true)}
                  className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                >
                  Revoked Membership
                  <span className="ml-2" aria-hidden="true">
                    <FaUserAltSlash />
                  </span>
                </button>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => changeRole("member", false)}
                  className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
                >
                  Accept Membership
                  <span className="ml-2" aria-hidden="true">
                    <FaUser />
                  </span>
                </button>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => deleteUser()}
                className={`group truncate flex font-semibold items-center justify-end w-full px-2 py-1 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300`}
              >
                Delete user
                <span className="ml-2" aria-hidden="true">
                  <IoTrashOutline />
                </span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileCardMenu;
