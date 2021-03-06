import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import {
  auth,
  firestore,
  googleAuthProvider,
  serverTimestamp,
} from "../../lib/firebase";
import Footer from "../../components/Footer";
import AuthLayout from "../../layouts/auth";
import { GlobalContext } from "@lib/globalContext";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsBusy } = useContext(GlobalContext);

  const AuthenticateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setIsLoading(false);
        return setErrorMessage(null);
      })
      .catch((error) => {
        setIsLoading(false);
        return setErrorMessage(error.message);
      });
  };

  const signInWithGoogle = () => {
    setErrorMessage(null);
    setIsLoading(true);
    setIsBusy(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const user = result.user;
        const userRef = firestore.doc(`users/${user.uid}`);
        const userSnap = await userRef.get();
        if (!userSnap.exists) {
          const { displayName, email } = user;
          const createdAt = serverTimestamp();
          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
            });
            setIsBusy(false);
            setIsLoading(false);
            setErrorMessage(null);
          } catch (error) {
            setIsBusy(false);
            setIsLoading(false);
            return setErrorMessage(error.message);
          }
        } else {
          setIsBusy(false);
          setIsLoading(false);
          setErrorMessage(null);
        }
      })
      .catch((error) => {
        setIsBusy(false);
        setIsLoading(false);
        return setErrorMessage(error.message);
      });
  };
  return (
    <div className="flex mt-6 relative min-h-screen flex-col justify-between">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-sm ">
          <div className="px-8 py-10 bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded">
            <Link href="/">
              <a className="font-cursive text-2xl flex flex-col items-center mb-8">
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
            <form onSubmit={(event) => AuthenticateUser(event)}>
              <div className="block mb-2">
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                  name="email"
                  required
                  type="email"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Email"
                />
              </div>
              <div className="block mb-4">
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                  required
                  type="password"
                  name="password"
                  className="block rounded w-full border bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="inline-flex items-center justify-center w-full px-10 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-primary rounded hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                {isLoading ? (
                  <span className="inline-flex text-2xl animate-spin text-white">
                    <CgSpinner />
                  </span>
                ) : (
                  "Log In"
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
            <div>
              <button
                onClick={() => signInWithGoogle()}
                disabled={isLoading}
                className="flex mx-auto font-medium justify-center text-center items-center focus:outline-none outline-none transition-colors hover:text-red-500 duration-300"
              >
                <FcGoogle /> <span className="ml-2">Login with Google</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <Link href="/accounts/password/reset">
                <a className="text-sm text-gray-400 dark:text-gray-200 transition duration-300 hover:text-primary">
                  Forgot password?
                </a>
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 flex-none">
            Don't have an account?
            <Link href="/accounts/register">
              <a className="ml-1 text-primary">Sign up</a>
            </Link>
          </div>
        </div>
      </div>
      <Footer variant="small" />
    </div>
  );
};

LoginPage.layout = AuthLayout;
export default LoginPage;
