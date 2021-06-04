import Link from "next/link";
import ActiveLink from "./ActiveLink";
import Button from "./Button";
import { HiMenuAlt2 } from "react-icons/hi";

const Nav = () => {
  return (
    <header className="fixed z-40 left-0 top-0 w-full h-20 bg-white dark:bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200 dark:border-gray-800">
      <div className="w-full hidden px-16 h-full lg:flex justify-between items-center">
        <div className="font-cursive text-2xl uppercase">
          Buet{" "}
          <span className="bg-primary rounded px-2 py-1 pb-0 text-white inline-block">
            87
          </span>
        </div>
        <div className="flex font-medium">
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/">
              <a>Home</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/about">
              <a>About Us</a>
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
            <ActiveLink activeClassName="text-primary" href="/members">
              <a>Members</a>
            </ActiveLink>
          </span>
          <span className="mx-4">
            <ActiveLink activeClassName="text-primary" href="/contact">
              <a>Contact</a>
            </ActiveLink>
          </span>
        </div>
        <div className="font-medium flex items-center">
          <span className="mr-5">
            <Link href="/login">
              <a className="transition duration-200 hover:text-primary">
                Sign in
              </a>
            </Link>
          </span>
          <Button href="/register" title="Sign up" />
        </div>
      </div>
      {/* Mobile nav */}
      <div className="w-full flex px-16 h-full lg:hidden justify-between items-center">
        <div>
          <HiMenuAlt2 />
        </div>
        <div className="font-cursive text-2xl uppercase">Buet 87</div>
        <div className="font-medium flex items-center">
          <span className="mr-5">
            <Link href="/login">
              <a className="transition duration-200 hover:text-primary">
                Sign in
              </a>
            </Link>
          </span>
          <Button href="/register" title="Sign up" />
        </div>
      </div>
    </header>
  );
};

export default Nav;