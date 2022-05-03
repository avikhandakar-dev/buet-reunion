import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import ActiveLink from "@components/ActiveLink";
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { adminSidebarTabs } from "layouts/admin";

const AdminSidebar = ({ isOpen, closeModal }) => {
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog
        onClose={closeModal}
        as="div"
        className="fixed inset-0 w-full h-full z-50"
      >
        <Transition.Child
          enter="transition-opacity ease-in-out-expo duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out-expo duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out-expo duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out-expo duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as={Fragment}
        >
          <div className="left-0 shadow-xl absolute top-0 h-full w-72 bg-white dark:bg-primaryDark">
            <div className="w-full h-full flex flex-col justify-between py-6">
              <div className="w-full flex flex-col space-y-2 px-6">
                <div className="w-full flex justify-end">
                  <a
                    className="text-primary-500 cursor-pointer"
                    onClick={() => closeModal()}
                  >
                    <IoMdClose className="text-2xl" />
                  </a>
                </div>

                <div className="flex justify-center flex-col items-center pb-8">
                  <Link href="/">
                    <a className="font-cursive text-xl flex flex-col items-center">
                      <span className="block dark:hidden">
                        <img src="/logo_wot.svg" width={50} />
                      </span>
                      <span className="hidden dark:block">
                        <img src="/logo_wot_white.svg" width={50} />
                      </span>
                      <p className="mt-[6px]">
                        BUETian <span className="text-primary">89</span> NA
                      </p>
                    </a>
                  </Link>
                </div>
                {adminSidebarTabs.map((item) => (
                  <span onClick={() => closeModal()} key={item.title}>
                    <ActiveLink
                      key={item.title}
                      activeClassName="!text-black dark:!text-white bg-primaryDark dark:bg-white bg-opacity-10 dark:bg-opacity-10"
                      href={item.href}
                    >
                      <a className="focus:outline-none text-gray-600 dark:text-adminTextDark flex items-center py-2 rounded-full px-4 mr-auto hover:bg-primaryDark dark:hover:bg-white dark:hover:hover:bg-opacity-10 hover:bg-opacity-10">
                        <i
                          className={`${item.color} dark:text-current text-xl mr-4 text-left`}
                        >
                          {item.icon}
                        </i>
                        <p className="text-body whitespace-nowrap text-left">
                          {item.title}
                        </p>
                      </a>
                    </ActiveLink>
                  </span>
                ))}
              </div>

              <div className="w-full relative px-6">
                <Link href="/accounts/logout">
                  <a className="focus:outline-none text-gray-600 dark:text-adminTextDark duration-300 flex items-center py-2 px-4 rounded-full mr-auto mb-3">
                    <i className="text-xl mr-4 text-left">
                      <RiLogoutBoxRLine />
                    </i>
                    <p className="text-body text-left">Logout</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default AdminSidebar;
