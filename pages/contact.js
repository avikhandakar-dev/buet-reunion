import Container from "@components/Container";
import { RiMapPinFill, RiSmartphoneFill } from "react-icons/ri";
import { AiFillMail } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container maxWidth="6xl" bgColor="bg-adminBgLight dark:bg-black">
      <div className="grid grid-cols-1 gap-10 mt-16 md:mt-20">
        <div>
          <div className="">
            <h1 className="text-4xl tracking-wider md:text-6xl xl:text-7xl mb-3 font-black">
              Fill the form.
              <br />
              It's easy.
            </h1>
            {/* <p className="text-xl dark:text-gray-400 text-gray-600">
              Fill up the form and we will get back
              <br /> to you within 24 hours.
            </p> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mt-8 mb-8">
        <form>
          <div className="grid grid-cols-2 gap-10 mb-8">
            <label className="block">
              <input
                type="text"
                required
                className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
                placeholder="Full name"
              />
            </label>
            <label className="block">
              <input
                type="email"
                required
                className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
                placeholder="Email"
              />
            </label>
          </div>
          <label class="block">
            <input
              type="text"
              required
              className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
              placeholder="Subject"
            />
          </label>
          <label className="block mt-8">
            <textarea
              className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black"
              rows="4"
              placeholder="Message"
            ></textarea>
          </label>
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex items-center justify-center px-10 py-3 mt-8 font-semibold text-white transition duration-500 ease-in-out transform bg-primary hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
          >
            {isLoading ? (
              <span className="inline-flex text-2xl animate-spin text-white">
                <CgSpinner />
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-16">
          <h3 className="font-medium text-3xl mb-3">Contact Info</h3>
          <p className="text-xl dark:text-gray-400 text-gray-600">
            Send a message and we will get back
            <br /> to you within 24 hours.
          </p>
          <div className="flex mt-6 mb-3 items-center">
            <span className="text-2xl text-primary mr-4">
              <RiMapPinFill />
            </span>
            <span>Street address</span>
          </div>
          <div className="flex mb-3 items-center">
            <span className="text-2xl text-primary mr-4">
              <RiSmartphoneFill />
            </span>
            <span>+88017123456</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl text-primary mr-4">
              <AiFillMail />
            </span>
            <span>contact@buetian89.com</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
