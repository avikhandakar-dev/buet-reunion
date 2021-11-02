import Image from "next/image";
import Button from "../Button";
import Container from "../Container";
import { RiVirusFill } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoIosSchool } from "react-icons/io";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
const About = () => {
  return (
    <Container bgColor="bg-gradient-to-bl from-primary to-sky">
      <div className="pb-10 md:pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl text-white">
            How we help
          </h1>
          <p className="text-xl text-white">
            We conduct charitable projects, locally and abroad, to enlighten and
            empower communities including members and their immediate families
            and other underprivileged individuals through the power of
            education, technology, and financing.
          </p>
        </div>
        <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center text-8xl justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <IoFastFoodOutline />
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              Food distribution
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              We help the poor and needy providing their food during emergency.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-9xl justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <IoIosSchool />
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              Education
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              We help underprivileged people to continue their education through
              various programs.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-7xl justify-center w-16 h-16 mb-4 rounded-full  mx-auto sm:w-24 sm:h-24 text-white">
              <FaBriefcaseMedical />
            </div>
            <h6 className="mb-2 font-semibold text-xl text-white md:text-2xl lg:text-3xl leading-5">
              Health Care
            </h6>
            <p className="max-w-md mb-3 text-lg text-white sm:mx-auto">
              We help poor and needy with the basic health care need through
              various ways.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
