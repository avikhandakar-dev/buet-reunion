import { Dialog, Transition } from "@headlessui/react";
import AuthContext from "@lib/authContext";
import { deleteImage, firestore, uploadImage } from "@lib/firebase";
import { Fragment, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

const ChangeProfilePicture = ({
  className,
  buttonTitle,
  buttonIcon,
  openOnStart,
}) => {
  const { user } = useContext(AuthContext);
  let [isOpen, setIsOpen] = useState(openOnStart);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  function closeModal() {
    if (!isLoading && !isRemoving) {
      setIsOpen(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const handelFileChange = async (event) => {
    const imageTypes = ["image/png", "image/jpeg"];
    const selected = event.target.files[0];
    if (selected && imageTypes.includes(selected.type)) {
      setImageFile(selected);
    } else {
      setImageFile(null);
      event.target.value = null;
      toast.error("Please select an image file (png or jpeg)");
    }
  };

  const deleteAvatar = async (noToast = false) => {
    if (!noToast) {
      setIsRemoving(true);
    }
    const docRef = firestore.collection("users").doc(user.uid);
    const snapData = await docRef.get();
    const userData = snapData.data();
    if (userData.avatar) {
      try {
        const deleteImageRes = await deleteImage(userData.avatar);
        await user.updateProfile({
          photoURL: null,
        });
        await firestore.collection("users").doc(user.uid).update({
          avatar: null,
        });
        if (!noToast) {
          toast.success("Profile picture removed!");
          setIsRemoving(false);
          closeModal();
        }
      } catch (error) {
        if (!noToast) {
          toast.error("Error removing profile picture!");
          setIsRemoving(false);
        }
      }
    } else {
      setIsRemoving(false);
      if (!noToast) {
        toast.success("Profile picture removed!");
        closeModal();
      }
    }
  };

  async function updateAvatar() {
    if (!user) {
      return false;
    }
    if (!imageFile) {
      return false;
    }
    await deleteAvatar(true);
    const {
      oriPath,
      oriDownloadUrl,
      thumbPath,
      thumbDownloadUrl,
      loaderPath,
      loaderDownloadUrl,
      fileName,
    } = await uploadImage({
      file: imageFile,
      folder: `avatar/${user.uid}`,
      format: "JPEG",
    });
    if (
      !oriPath ||
      !oriDownloadUrl ||
      !thumbPath ||
      !thumbDownloadUrl ||
      !loaderPath ||
      !loaderDownloadUrl ||
      !fileName
    ) {
      return false;
    }
    try {
      await user.updateProfile({
        photoURL: thumbDownloadUrl,
      });
      await firestore.collection("users").doc(user.uid).update({
        avatar: {
          oriPath,
          oriDownloadUrl,
          thumbPath,
          thumbDownloadUrl,
          loaderPath,
          loaderDownloadUrl,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const unsubs = async () => {
      if (imageFile) {
        setIsLoading(true);
        const res = await updateAvatar();
        if (res) {
          toast.success("Successfully updated profile picture!");
          setImageFile(null);
        } else {
          toast.error("Server error! Can't change profile picture!");
        }
        setIsLoading(false);
        closeModal();
      }
    };
    return unsubs();
  }, [imageFile]);

  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {buttonIcon && (
          <span className={`${buttonTitle && "mr-2"}`}>{buttonIcon}</span>
        )}
        {buttonTitle}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full pt-8 max-w-sm text-center my-8 overflow-hidden align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg relative">
                <Dialog.Title
                  as="div"
                  className="text-lg border-b font-medium text-gray-900 dark:text-gray-200 pb-3 border-gray-200 dark:border-gray-700 px-6"
                >
                  <span className="mb-4 block text-xl">
                    Change Profile Picture
                  </span>
                  <a
                    onClick={closeModal}
                    className="cursor-pointer absolute right-3 top-3 text-gray-800 text-xl dark:text-gray-200"
                  >
                    <IoClose />
                  </a>
                </Dialog.Title>
                <div className="flex flex-col justify-center divide-y divide-gray-200 dark:divide-gray-700">
                  <label className="cursor-pointer">
                    <a
                      disabled={isLoading}
                      type="button"
                      onClick={() => null}
                      className="block w-full text-center py-3 text-sm font-semibold text-primary bg-transparent duration-300 hover:text-sky"
                    >
                      {isLoading ? (
                        <span className="text-xl flex justify-center items-center animate-spin text-primary">
                          <CgSpinner />
                        </span>
                      ) : (
                        "Upload Picture"
                      )}
                    </a>
                    <input
                      onChange={(event) => handelFileChange(event)}
                      type="file"
                      className="hidden"
                    />
                  </label>
                  <button
                    disabled={isRemoving}
                    type="button"
                    onClick={() => deleteAvatar()}
                    className="block text-center py-3 text-sm font-semibold text-red-500 bg-transparent duration-300 hover:text-red-400"
                  >
                    {isRemoving ? (
                      <span className="text-xl flex justify-center items-center animate-spin text-red-500">
                        <CgSpinner />
                      </span>
                    ) : (
                      "Remove Current Photo"
                    )}
                  </button>
                  <button
                    disabled={isLoading || isRemoving}
                    type="button"
                    className="block text-center py-3 text-sm font-medium bg-transparent focus:outline-none"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ChangeProfilePicture.defaultProps = {
  openOnStart: false,
  buttonTitle: "Change Profile Picture",
  buttonIcon: null,
  isLoading: false,
};

export default ChangeProfilePicture;
