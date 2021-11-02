import AuthContext from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";
import Button from "../Button";
import Container from "../Container";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Hero = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <div className="grid items-center justify-center lg:grid-cols-2 gap-10 lg:gap-0 pt-16 lg:pt-32 lg:pb-16 sm:px-6">
        <div className="lg:max-w-md md:max-w-full">
          <h1 className="mb-4 text-4xl font-black md:text-6xl">
            Create the World You Want to Live In
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed dark:text-gray-300 mb-8">
            The BUETian89 Foundation of North America is a non-profit,
            non-political, non-religious, social organization which conducts
            charitable projects, locally and abroad, to enlighten and empower
            underprivileged communities.
          </p>
          <div className="">
            <span className="mr-5">
              {user ? (
                <Button
                  href="/projects"
                  title="View Our Projects"
                  size="large"
                />
              ) : (
                <div className="flex items-center space-x-4">
                  <Button href="/projects" title="Our Projects" size="large" />
                  <Link href="/accounts/register">
                    <a className="inline-flex items-center font-semibold transition-colors duration-200 text-primary hover:text-sky">
                      Become a Member{" "}
                      <BiChevronRight className="text-2xl mt-1" />
                    </a>
                  </Link>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="relative lg:px-10">
          <div className="relative">
            <span className="absolute hidden lg:block w-full h-full rounded-md -top-2 left-2 border-2 bg-primary border-primary opacity-60" />
            <div className="w-full aspect-h-3 lg:aspect-h-6 aspect-w-6 relative overflow-hidden rounded-md">
              <Image
                src="/img/hero-image.jpeg"
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
