const { default: Button } = require("../Button");
import Image from "next/image";
import Container from "../Container";
const Hero = () => {
  return (
    <div className="bg-gradient-1 bg-no-repeat bg-center bg-cover relative mx-auto max-w-screen-xl">
      <div className="pt-32 md:pt-40 pb-10 md:pb-16 px-4 sm:px-6">
        <div className="pb-12 md:pb-16 text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Stand by the humanity
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We are a group of Engineers and Architects from Bangladesh
            University of Engineering and Technology (BUET) who started the BUET
            classes on Aug 10, 1988 in session 1987-88.
          </p>
          <div className="flex text-center items-center justify-center">
            <span className="mr-5">
              <Button href="/register" title="Become a Member" size="large" />
            </span>
            <span>
              <Button
                color="black"
                href="/about"
                title="Learn More"
                size="large"
              />
            </span>
          </div>
        </div>
        <Container>
          <div className="relative rounded-md overflow-hidden  flex justify-center items-center">
            <Image src="/img/hero-image-1.jpeg" width={2048} height={1152} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
