import { BsArrowDown } from "react-icons/bs";
import Container from "../Container";

const DonateHeader = () => {
  return (
    <Container bgColor="bg-primary mt-20">
      <div className="grid items-center justify-center lg:grid-cols-2 gap-10 lg:gap-0 px-4 sm:px-0">
        <div className="lg:max-w-xl md:max-w-full">
          <h1 className="mb-4 uppercase text-4xl text-white font-black md:text-6xl xl:text-7xl">
            <span className="bg-clip-text block whitespace- text-transparent bg-gradient-to-l from-yellow-400 to-yellow-200">
              Be the reason
            </span>
            Someone smiles today
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            Your donation will help children, adults, and families rise above
            adversity and thrive. No matter the amount, your donation makes a
            difference.
          </p>
          <a
            href="#donation"
            className="w-12 h-12 text-white bg-white bg-opacity-10 rounded-full flex justify-center items-center"
          >
            <span className="">
              <BsArrowDown className="text-2xl animate-bounce" />
            </span>
          </a>
        </div>
        <div className="relative lg:px-10 hidden lg:block">
          <div className="relative">
            <div className="w-full aspect-h-3 lg:aspect-h-6 aspect-w-6 relative overflow-hidden rounded-md">
              <img src="/img/donation.svg" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonateHeader;
