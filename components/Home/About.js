import Image from "next/image";
import Button from "../Button";
import Container from "../Container";

const About = () => {
  return (
    <Container>
      <div className="pb-10 md:pb-16">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="uppercase font-medium text-gray-500 dark:text-gray-300">
            About Us —
          </p>
          <h1 className="font-bold text-3xl md:text-4xl mb-4">Who we are</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            BUET 87 Foundation is a registered non-profit organization in the
            state of Arizona, USA
          </p>
        </div>
        <article className="mt-8 flex relative w-full">
          <figure className="rounded-r-md hidden sm:block overflow-hidden absolute w-1/2 h-full right-0 top-0">
            <Image
              src="/img/about-image-1.jpeg"
              layout="fill"
              objectFit="cover"
            />
          </figure>
          <div className="z-10 min-w-0 sm:min-w-500 rounded-l-md p-12 pl-8 w-full sm:w-1/2 max-w-2xl flex-shrink-0 bg-gray-100 dark:bg-darkBrown">
            <div className="mb-4">
              <h3 className="font-bold text-2xl mb-2 w-max relative">
                About us
                <span
                  style={{ zIndex: "-1" }}
                  className="absolute w-full h-2 bg-gradient-3-start left-0 bottom-1"
                />
              </h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <h3 className="font-bold text-2xl mb-2 w-max relative">
                Our goal
                <span
                  style={{ zIndex: "-1" }}
                  className="absolute w-full h-2 bg-gradient-4-start left-0 bottom-1"
                />
              </h3>
              Our goals are to strengthen and perpetuate the Bangladeshi
              culture, tradition, heritage. We promote social, cultural
              activities and diversity. BUET 87 conducts charitable welfares as
              needed and deemed appropriate by the Board of Directors. We serve
              as a platform for exchange of information and views on matters of
              interest to its members. We represent members to any local, state
              or federal authority when needed.
            </div>
            <Button
              color="primary"
              href="/about"
              title="Learn More"
              size="medium"
            />
          </div>
        </article>
      </div>
    </Container>
  );
};

export default About;
