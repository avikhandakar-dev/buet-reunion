import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { IoClose, IoWarningOutline } from "react-icons/io5";

const ConfirmModal = ({
  type,
  className,
  title,
  buttonTitle,
  actionButtonTitle,
  buttonIcon,
  body,
  openOnStart,
  action,
  isLoading,
  processFinished,
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

  useEffect(() => {
    const unsubs = () => {
      if (processFinished) {
        setIsOpen(false);
      }
    };
    return unsubs();
  }, [processFinished]);

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
              <div className="inline-block w-full p-8 max-w-md text-center my-8 overflow-hidden align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-md relative">
                <Dialog.Title
                  as="div"
                  className="text-lg font-medium text-gray-900 dark:text-gray-200 pb-3 dark:border-gray-800 px-6"
                >
                  {type == "warning" ? (
                    <div className="text-5xl w-20 h-20 mb-4 text-yellow-500 mx-auto flex justify-center items-center">
                      <IoWarningOutline />
                    </div>
                  ) : (
                    <div className="text-5xl w-20 h-20 mb-4 rounded-full border-2 border-red-500 text-red-500 mx-auto flex justify-center items-center">
                      <IoMdClose />
                    </div>
                  )}
                  <span className="mb-4 block text-3xl">{title}</span>
                  <a
                    onClick={closeModal}
                    className="cursor-pointer absolute right-3 top-3 text-gray-800 text-xl dark:text-gray-200"
                  >
                    <IoClose />
                  </a>
                </Dialog.Title>
                <div className="flex flex-col justify-between">
                  <div className="overflow-y-auto mb-8 text-lg text-gray-600 dark:text-gray-400">
                    {body}
                  </div>

                  <div className="flex-shrink-0 flex justify-center items-center">
                    <button
                      disabled={isLoading}
                      type="button"
                      className="inline-flex mr-3 justify-center px-6 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isLoading}
                      type="button"
                      onClick={action}
                      className={`${
                        type == "warning"
                          ? "bg-yellow-500 hover:bg-yellow-400"
                          : "bg-red-500 hover:bg-red-400"
                      } inline-flex justify-center w-24 text-center py-2 text-sm font-medium text-white border border-transparent rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500`}
                    >
                      {isLoading ? (
                        <span className="inline-flex text-xl animate-spin text-white">
                          <CgSpinner />
                        </span>
                      ) : (
                        actionButtonTitle
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ConfirmModal.defaultProps = {
  openOnStart: false,
  title: "Are you sure?",
  type: "error",
  buttonTitle: null,
  actionButtonTitle: "Delete",
  buttonIcon: null,
  isLoading: false,
  processFinished: false,
};

export default ConfirmModal;
