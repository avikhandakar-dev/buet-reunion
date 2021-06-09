import Image from "next/image";
import Button from "../Button";
import Container from "../Container";
import { RiVirusFill } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
const About = () => {
  return (
    <Container bgColor="bg-gradient-to-bl from-blue to-sky">
      <div className="pb-10 md:pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl text-white">
            How we help
          </h1>
          <p className="text-xl text-white font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64m258-80c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M344 336H179.31a8 8 0 00-5.65 2.34l-26.83 26.83a4 4 0 01-5.66 0l-26.83-26.83a8 8 0 00-5.65-2.34H56a24 24 0 01-24-24h0a24 24 0 0124-24h288a24 24 0 0124 24h0a24 24 0 01-24 24zM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M256 480h139.31a32 32 0 0031.91-29.61L463 112"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="32"
                  d="M368 112l16-64 47-16"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M224 112h256"
                ></path>
              </svg>
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              Food distribution
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              Cheese on toast airedale the big cheese. Danish fontina cheesy
              grin airedale danish
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-9xl justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <RiVirusFill />
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              COVID-19 help
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              Cheese on toast airedale the big cheese. Danish fontina cheesy
              grin airedale danish
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-9xl justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <BiDonateHeart />
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              Helping poor
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              Cheese on toast airedale the big cheese. Danish fontina cheesy
              grin airedale danish
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
