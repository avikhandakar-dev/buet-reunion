import { GlobalContext } from "@lib/globalContext";
import { Fragment, useContext } from "react";
import { Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

const MobileNav = () => {
  const { showMobileNav, setShowMobileNav } = useContext(GlobalContext);
  return (
    <Transition show={showMobileNav}>
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
            onClick={() => setShowMobileNav(false)}
            className="bg-black bg-opacity-70  absolute w-full h-full"
          />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as={Fragment}
        >
          <div className="left-0 absolute top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 dark:bg-opacity-70 bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-saturate-150 shadow-md">
            <div className=" absolute right-2 top-2 z-50">
              <a
                onClick={() => setShowMobileNav(false)}
                className="flex cursor-pointer transition-colors text-gray-700 dark:text-gray-300 duration-300 hover:text-primary justify-center items-center"
              >
                <IoCloseOutline className="text-3xl mr-2" />
              </a>
            </div>
            <div className="relative h-full py-8 flex flex-col justify-between px-8">
              <div>
                <p className="text-sm font-semibold">
                  BUETian <span className="text-primary">89</span> NA
                </p>
              </div>
              <div
                onClick={() => {
                  setShowMobileNav(false);
                }}
                className="flex flex-col space-y-3"
              >
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/">
                    <a className="duration-300 hover:text-primary w-full block">
                      Home
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/projects">
                    <a className="duration-300 hover:text-primary w-full block">
                      Projects
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/donate">
                    <a className="duration-300 hover:text-primary w-full block">
                      Donate
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/blog">
                    <a className="duration-300 hover:text-primary w-full block">
                      Blog
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/members">
                    <a className="duration-300 hover:text-primary w-full block">
                      Members
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/about">
                    <a className="duration-300 hover:text-primary w-full block">
                      About Us
                    </a>
                  </ActiveLink>
                </span>
                <span className="text-2xl uppercase font-black">
                  <ActiveLink activeClassName="text-primary" href="/contact">
                    <a className="duration-300 hover:text-primary w-full block">
                      Contact
                    </a>
                  </ActiveLink>
                </span>
              </div>
              <div>
                <p className="text-xs">P.O Box 2751 Santa Clara, CA 95055</p>
                <a
                  className="text-xs font-semibold"
                  href="mailto:contact@buetian89na.org"
                >
                  contact@buetian89na.org
                </a>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default MobileNav;
