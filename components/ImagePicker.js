import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ImagePicker = ({
  className,
  title,
  buttonTitle,
  buttonIcon,
  multiple,
  selectedImages,
  openOnStart,
}) => {
  let [isOpen, setIsOpen] = useState(openOnStart);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="contents">
        <button type="button" onClick={openModal} className={className}>
          {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
          {buttonTitle}
        </button>
      </div>

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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-700 shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 bg-gray-100 text-gray-900 dark:bg-gray-800 py-3 dark:text-gray-200 pb-3 border-b border-gray-200 dark:border-gray-800 px-6 flex justify-between items-center"
                >
                  {title}
                  <a
                    onClick={closeModal}
                    className="cursor-pointer text-gray-800 text-xl dark:text-gray-200"
                  >
                    <IoClose />
                  </a>
                </Dialog.Title>
                <div className="mt-2 px-6">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent
                    your an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4 px-6 py-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
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

ImagePicker.defaultProps = {
  openOnStart: false,
  title: "Choose an Image",
  buttonTitle: "Choose",
  multiple: false,
  buttonIcon: <IoIosImages />,
};

export default ImagePicker;
