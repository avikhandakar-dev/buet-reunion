import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { FiMapPin, FiSmartphone } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { VscSymbolClass } from "react-icons/vsc";
import { GoQuote } from "react-icons/go";

const MemberCard = ({ member, isModalShow, close }) => {
  return (
    <Transition show={isModalShow}>
      <div className="fixed inset-0 w-full h-full z-50">
        <Transition.Child
          enter="transition-opacity ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div
            onClick={() => close()}
            className="bg-black bg-opacity-80  absolute w-full h-full"
          />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          as={Fragment}
        >
          <div className="left-0 rounded-t-xl overflow-hidden absolute bottom-0 h-[calc(100vh-70px)] w-full bg-white dark:bg-gray-800 dark:bg-opacity-90 bg-opacity-90 backdrop-filter backdrop-blur-xl backdrop-saturate-150 shadow-md">
            <button
              className="absolute z-10 right-2 top-2 text-5xl"
              onClick={() => close()}
            >
              <IoCloseOutline />
            </button>
            <div className="w-full h-full overflow-y-auto no-scrollbar">
              <div className="grid lg:grid-cols-2 gap-8 h-full p-4">
                <div className="relative min-h-[250px] h-full rounded-xl overflow-hidden shadow-md w-full bg-gray-50 dark:bg-gray-900 mt-12 lg:mt-0">
                  {member.profile?.avatar ? (
                    <Image
                      placeholder="blur"
                      blurDataURL={member.profile.avatar.loaderDownloadUrl}
                      src={member.profile.avatar.oriDownloadUrl}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : member.authData.photoURL ? (
                    <Image
                      src={member.authData.photoURL}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full text-gray-400 dark:text-gray-600 dark:bg-gray-800 bg-gray-200 flex justify-center items-center text-7xl">
                      <AiFillPicture />
                    </div>
                  )}
                </div>
                <div className="">
                  <div className="pt-8 flex  flex-col lg:justify-center h-full">
                    <h1 className="text-3xl font-bold font-serif">
                      {member.authData.displayName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {member.authData.email}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 max-w-3xl gap-4 text-gray-700 dark:text-gray-400 py-8">
                      <div className="flex space-x-2 mr-12 mb-4">
                        <div className="text-white flex-shrink-0 w-10 h-10 text-xl flex justify-center items-center bg-pink-500 rounded-full">
                          <FiMapPin />
                        </div>
                        <div className="text-left">
                          <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                            Location
                          </p>
                          <p className="text-black dark:text-white text-sm">
                            {member.profile?.state || "Unknown"},{" "}
                            {member.profile?.country || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mr-12 mb-4">
                        <div className="flex-shrink-0 text-white w-10 h-10 text-xl flex justify-center items-center bg-yellow-500 rounded-full">
                          <FiSmartphone />
                        </div>
                        <div className="text-left">
                          <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                            Phone
                          </p>
                          <p className="text-black dark:text-white text-sm">
                            {member.profile?.phone || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mr-12 mb-4">
                        <div className="flex-shrink-0 text-white w-10 h-10 text-xl flex justify-center items-center bg-sky rounded-full">
                          <VscSymbolClass />
                        </div>
                        <div className="text-left">
                          <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                            Department
                          </p>
                          <p className="text-black dark:text-white text-sm">
                            {member.profile?.department || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mr-12 mb-4">
                        <div className="flex-shrink-0 text-white w-10 h-10 text-xl flex justify-center items-center bg-indigo-500 rounded-full">
                          <AiTwotoneCalendar />
                        </div>
                        <div className="text-left">
                          <p className="uppercase truncate text-gray-400 dark:text-gray-200 font-semibold text-sm">
                            Class Begins
                          </p>
                          <p className="text-black dark:text-white text-sm">
                            {member.profile?.CBB || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mr-12 mb-4">
                        <div className="flex-shrink-0 text-white w-10 h-10 text-xl flex justify-center items-center bg-green-500 rounded-full">
                          <BsBuilding />
                        </div>
                        <div className="text-left">
                          <p className="uppercase text-gray-400 dark:text-gray-200 font-semibold text-sm">
                            Hall
                          </p>
                          <p className="text-black dark:text-white truncate text-sm">
                            {member.profile?.hall || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {member.profile?.bio && (
                      <figure className="py-8 pl-12 relative max-w-3xl">
                        <div className="absolute top-0 left-0 text-4xl text-yellow-400">
                          <GoQuote />
                        </div>
                        <blockquote className="italic font-serif text-gray-900 dark:text-gray-200">
                          {member.profile.bio}
                        </blockquote>
                        <figcaption className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                          -{member.authData.displayName}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default MemberCard;
