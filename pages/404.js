import Link from "next/link";
import Owl from "../components/Svg/Owl";

const NotFound = () => {
  return (
    <div className="bg-gradient-2 bg-no-repeat bg-center bg-cover relative mx-auto max-w-screen-xl">
      <div className="pt-32 md:pt-40 pb-10 md:pb-16 px-4 sm:px-6">
        <div className="pb-12 md:pb-16 text-center max-w-3xl mx-auto">
          <div className="mx-auto w-52 h-52 relative">
            <Owl />
          </div>
          <h1 className="mb-4 text-2xl sm:text-4xl font-bold md:text-5xl">
            Opps. That page doesn’t exist.
          </h1>
          <div className="text-lg">
            Head to our{" "}
            <Link href="/">
              <a className="text-primary font-medium">homepage</a>
            </Link>{" "}
            that does exist, or try double-checking the URL.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
