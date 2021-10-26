import Link from "next/link";
import ActiveLink from "./ActiveLink";
import Button from "./Button";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import AuthIcon from "./AuthIcon";

const Nav = () => {
  return (
    <header className="fixed z-40 left-0 top-0 w-full h-20 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full hidden px-16 h-full lg:flex justify-between items-center">
        <Link href="/">
          <a className="font-cursive text-2xl uppercase flex items-center space-x-2">
            <span className="block dark:hidden">
              <img src="/logo_wot.svg" width={50} />
            </span>
            <span className="hidden dark:block">
              <img src="/logo_wot_white.svg" width={50} />
            </span>
            <p className="mt-[6px]">
              Buetian <span className="text-primary">89</span> NA
            </p>
          </a>
        </Link>
        <div className="flex font-medium">
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/">
              <a>Home</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/projects">
              <a>Projects</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/blog">
              <a>Blog</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/about">
              <a>About Us</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/contact">
              <a>Contact</a>
            </ActiveLink>
          </span>
        </div>
        <div className="font-medium flex items-center justify-center">
          <AuthIcon />
          <Button href="/donate" title="Donate" />
        </div>
      </div>
      {/* Mobile nav */}
      <div className="w-full flex px-8 sm:px-16 h-full lg:hidden justify-between items-center">
        <div>
          <HiMenuAlt2 />
        </div>
        <div className="font-cursive text-2xl uppercase">BUETIAN 89</div>
        <div className="font-medium flex items-center">
          {/* <span className="mr-5"> */}
          <Link href="/login">
            <a className="transition duration-200 hover:text-primary">
              <AiOutlineUser />
            </a>
          </Link>
          {/* </span> */}
          {/* <Button href="/register" title="Sign up" /> */}
        </div>
      </div>
    </header>
  );
};

export default Nav;
