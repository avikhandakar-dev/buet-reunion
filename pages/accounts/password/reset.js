import { useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import AuthLayout from "../../../layouts/auth";
import { auth } from "../../../lib/firebase";
import Footer from "../../../components/Footer";
import { BiChevronsLeft } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const AuthenticateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        setResetSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setResetSuccess(false);
        return setErrorMessage(error.message);
      });
  };
  return (
    <div className="flex mt-6 relative min-h-screen flex-col justify-between">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-sm ">
          <div className="px-8 py-10 bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded">
            <div className="font-cursive mb-8 text-2xl uppercase text-center">
              BUETian{" "}
              <span className="bg-primary rounded px-2 py-1 pb-0 text-white inline-block">
                89
              </span>
            </div>
            {resetSuccess ? (
              <div className="flex flex-col py-10 justify-center items-center">
                <div className="text-7xl md:text-9xl text-primary">
                  <BsCheckCircle />
                </div>
                <div className="mt-2 text-center">
                  An email has been sent with instruction to reset your
                  password.
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <p className="font-medium text-2xl capitalize mb-2">
                    Lost your password?
                  </p>
                  <p className="mb-2 text-gray-400">
                    Please enter your email address. You will receive a link to
                    create a new password.
                  </p>
                </div>
                <form onSubmit={(event) => AuthenticateUser(event)}>
                  <div className="block mb-2">
                    <input
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      value={email}
                      required
                      type="email"
                      name="email"
                      className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                      placeholder="Email"
                    />
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="inline-flex capitalize items-center justify-center w-full px-10 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-primary rounded hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
                  >
                    {isLoading ? (
                      <span className="inline-flex text-2xl animate-spin text-white">
                        <CgSpinner />
                      </span>
                    ) : (
                      "Send link"
                    )}
                  </button>
                  {errorMessage ? (
                    <div className=" text-red-500 py-2 text-sm font-medium w-full text-center">
                      {errorMessage}
                    </div>
                  ) : null}
                </form>
                <div className="relative w-full border-b-2 my-8 border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-sm absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 bg-gray-50 px-5 dark:bg-gray-900">
                    OR
                  </span>
                </div>
                <div className="text-center mb-4">
                  <Link href="/accounts/register">
                    <a className="capitalize font-medium border border-black dark:border-white transition-colors hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded px-5 py-2 w-full block">
                      Create new account
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex-none">
            <Link href="/accounts/login">
              <a className="ml-1 transition-colors duration-300 hover:text-primary capitalize flex items-center">
                <span className="text-lg">
                  <BiChevronsLeft />
                </span>
                Back to login
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer variant="small" />
    </div>
  );
};

ResetPassword.layout = AuthLayout;
export default ResetPassword;
