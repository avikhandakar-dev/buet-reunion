import ContactForm from "@components/ContactForm";
import { RiMapPinFill } from "react-icons/ri";

const Contact = () => {
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2">
        <div className="min-h-screen relative w-full dark:from-gray-800 dark:to-gray-800 bg-gradient-to-bl from-gradient-5-start to-gradient-5-stop">
          <div className="flex h-full justify-between flex-col py-8">
            <div>
              <h1 className="text-5xl px-16 pt-20 pb-8 text-[#0f4b68] dark:text-white font-semibold font-serif">
                We'd love to <br />
                hear from you
              </h1>
              <img className="px-16 max-w-xl" src="/img/contact.svg" />
            </div>
            <div className="flex items-center px-16">
              <span className="text-2xl dark:text-white text-[#0f4b68] mr-4">
                <RiMapPinFill />
              </span>
              <span className="text-[#0f4b68] dark:text-white">
                P.O Box 2751 Santa Clara, CA 95055
              </span>
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-gray-50 dark:bg-black py-8 flex justify-center items-center">
          <div className="px-16 max-w-xl mx-auto mt-20">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
