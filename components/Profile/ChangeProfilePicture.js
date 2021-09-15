import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

const ChangeProfilePicture = ({
  className,
  buttonTitle,
  buttonIcon,
  openOnStart,
  isLoading,
}) => {
  let [isOpen, setIsOpen] = useState(openOnStart);
  function closeModal() {
    if (!isLoading) {
      setIsOpen(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

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
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => null}
                    className="block text-center py-3 text-sm font-semibold text-primary bg-transparent duration-300 hover:text-sky"
                  >
                    {isLoading ? (
                      <span className="block text-sm animate-spin text-primary">
                        <CgSpinner />
                      </span>
                    ) : (
                      "Upload Picture"
                    )}
                  </button>
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => null}
                    className="block text-center py-3 text-sm font-semibold text-red-500 bg-transparent duration-300 hover:text-red-400"
                  >
                    {isLoading ? (
                      <span className="block text-sm animate-spin text-red-500">
                        <CgSpinner />
                      </span>
                    ) : (
                      "Remove Current Photo"
                    )}
                  </button>
                  <button
                    disabled={isLoading}
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
