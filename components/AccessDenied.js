import Container from "./Container";
import Link from "next/link";
const AccessDenied = () => {
  return (
    <Container>
      <div className="w-full h-screen absolute inset-0 flex justify-center items-center">
        <div className="max-w-lg mx-auto">
          <div className="text-center flex flex-col space-y-2">
            <h1 className="font-black text-9xl font-cursive text-pink-500">
              403
            </h1>
            <p className="text-3xl text-gray-700 dark:text-gray-300 font-bold font-serif">
              Access Denied
            </p>
            <div className="font-medium text-pink-700 dark:text-pink-400 text-opacity-30">
              Sorry, but you don't have permission to access this page <br />{" "}
              You can go back to{" "}
              <Link href="/">
                <a className="font-bold text-pink-700 duration-300 hover:text-primary">
                  home page
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccessDenied;
