import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import Container from "../Container";
const Featured = () => {
  return (
    <Container>
      <div className="max-w-xl mx-auto lg:max-w-screen-xl">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
            Featured{" "}
            <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-blue to-sky">
              project
            </span>
          </h1>
          <Link href="/projects">
            <a className="text-xl w-max mx-auto lg:text-2xl transition-colors duration-300 hover:text-primary flex justify-center items-center">
              View all projects{" "}
              <span className="">
                <AiOutlineArrowRight />
              </span>
            </a>
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold sm:text-4xl sm:leading-none">
                Winter blanket
                <br className="hidden md:block" />
                distribution
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
                Like every year, BUETian89 foundation has started a project to
                distribute blankets to poor people in remote areas of Bangladesh
                to help them cope with the winter chill. Please use the button
                below to donate to this project.
              </p>
            </div>
            <div className="flex">
              <Button title="Donate Now" href="/donate" />
              <a
                href="/"
                aria-label=""
                className="inline-flex ml-5 items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                View project
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center -mx-4 lg:pl-8">
            <div className="flex flex-col items-end px-3">
              <img
                className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <img
                className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
            </div>
            <div className="px-3">
              <img
                className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                src="https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Featured;
