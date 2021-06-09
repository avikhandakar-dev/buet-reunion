import Image from "next/image";
import Button from "../Button";
import Container from "../Container";

const Hero = () => {
  return (
    <Container bgColor="">
      <div className="grid items-center justify-center lg:grid-cols-2 gap-10 lg:gap-0 pt-32 pb-16 px-4 sm:px-6">
        <div className="lg:max-w-md md:max-w-full">
          <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
            Stand by <br />
            <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-bl from-blue to-sky">
              The Humanity
            </span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed dark:text-gray-300 mb-8">
            The BUETian89 Foundation of North America is a non-profit,
            non-political, non-religious, social organization that promotes
            social and professional connection among the alumni of ex-students
            of BUET 89 batch in North America.
          </p>
          <div className="">
            <span className="mr-5">
              <Button href="/register" title="Become a Member" size="large" />
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
