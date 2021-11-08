import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { fetchPostJSON } from "@lib/healper";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetchPostJSON("/api/mail/send", {
      name,
      email: "avikhandakar@gmail.com",
      subject,
      message,
    });
    if (response.statusCode === 200) {
      toast.success("Thanks for contacting us!");
      setSuccess(true);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };
  if (success) {
    return (
      <div className="w-full h-full min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <span className="text-5xl md:text-7xl text-green-500 mx-auto w-max block">
            <FiCheckCircle />
          </span>
          <h1 className=" text-5xl md:text-7xl uppercase font-black">
            Thank{" "}
            <span className="bg-gradient-to-l from-green-200 to-green-500 bg-clip-text whitespace-nowrap text-transparent">
              You
            </span>
          </h1>
          <p className="font-semibold uppercase">We received your message</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handelSubmit}>
      <h1 className="font- uppercase text-3xl font-bold mb-8 lg:text-gray-500 lg:dark:text-gray-600">
        Contact Us{" "}
      </h1>
      <div className="grid grid-cols-2 gap-10 mb-8">
        <label className="block">
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            type="text"
            name="name"
            required
            className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-primary"
            placeholder="Full name"
          />
        </label>
        <label className="block">
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            name="email"
            required
            className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-primary"
            placeholder="Email"
          />
        </label>
      </div>
      <label class="block">
        <input
          onChange={(event) => {
            setSubject(event.target.value);
          }}
          value={subject}
          type="text"
          name="subject"
          required
          className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-primary"
          placeholder="Subject"
        />
      </label>
      <label className="block mt-8">
        <textarea
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
          className="mt-0 bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-primary"
          rows="4"
          name="message"
          placeholder="Message"
        ></textarea>
      </label>
      <button
        disabled={isLoading}
        type="submit"
        className="inline-flex items-center justify-center px-10 py-3 mt-8 font-semibold text-white transition duration-500 ease-in-out transform bg-primary hover:bg-sky focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 rounded"
      >
        {isLoading ? (
          <>
            <p className="mr-2">Please wait</p>
            <span className="inline-flex text-2xl animate-spin text-white">
              <CgSpinner />
            </span>
          </>
        ) : (
          "Send Message"
        )}
      </button>
      <div className="mt-8">
        <p className="uppercase font-semibold text-gray-500 dark:text-gray-600">
          Email Us
        </p>
        <a
          href="mailto:contact@buetian89na.org"
          className="duration-300 hover:text-primary font-light"
        >
          contact@buetian89na.org
        </a>
      </div>
    </form>
  );
};

export default ContactForm;
