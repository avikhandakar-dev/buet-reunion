import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";
import Empty from "./Svg/Empty";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

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
  const [isSelected, setIsSelected] = useState([]);
  const [media = [], loading, error] = useCollectionData(
    firestore.collection("media").orderBy("createdAt", "desc")
  );
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const toggleSelected = (image) => {
    setIsSelected((options) => {
      if (multiple) {
        if (isSelected.includes(image)) {
          return options.filter((option) => option !== image);
        } else {
          return [...options, image];
        }
      } else {
        return [image];
      }
    });
  };
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
                <div
                  style={{ maxHeight: "80vh", minHeight: "500px" }}
                  className="flex flex-col justify-between"
                >
                  <div className="px-6 overflow-y-auto">
                    {media.length < 1 ? (
                      <Fragment>
                        <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 h-96 flex flex-col justify-center items-center">
                          <Empty
                            width={150}
                            className="text-gray-600 dark:text-gray-200"
                          />
                          <div className="mt-3">
                            <Link href="/admin/media/upload">
                              <a className="flex border-2 rounded px-5 py-3 dark:border-gradient-1-start border-gradient-4-start dark:text-gradient-1-start text-gradient-4-start uppercase font-medium justify-center items-center transition-colors duration-300 hover:text-yellow-800 dark:hover:bg-gradient-1-start hover:bg-gradient-4-start">
                                <FaCloudUploadAlt className="mr-2 text-xl" />
                                Upload some images
                              </a>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <div className="py-4 bg-gray-50 dark:bg-gray-700">
                        <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 justify-around justify-items-stretch gap-4 relative">
                          {media.map((image) => (
                            <Fragment>
                              <div
                                key={image.id}
                                onClick={() => toggleSelected(image)}
                                className="overflow-hidden cursor-pointer relative group rounded-md"
                              >
                                {isSelected.includes(image) && (
                                  <Fragment>
                                    <div className="text-white absolute inset-0 w-full h-full z-10 bg-black bg-opacity-30 flex justify-end p-2">
                                      <FaCheckCircle />
                                    </div>
                                  </Fragment>
                                )}
                                <div className="w-full relative overflow-hidden rounded-md h-auto transform group-hover:scale-110 transition duration-700">
                                  <Image
                                    placeholder="blur"
                                    blurDataURL={image.loaderDownloadUrl}
                                    src={image.thumbDownloadUrl}
                                    width={150}
                                    height={150}
                                    priority={true}
                                    objectFit="cover"
                                    layout="responsive"
                                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 150px"
                                    loading="eager"
                                  />
                                </div>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-3 flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-16 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                      onClick={() => {
                        selectedImages(isSelected);
                        closeModal();
                      }}
                    >
                      Open
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

ImagePicker.defaultProps = {
  openOnStart: false,
  title: "Choose an Image",
  buttonTitle: "Choose",
  multiple: false,
  buttonIcon: <IoIosImages />,
};

export default ImagePicker;
