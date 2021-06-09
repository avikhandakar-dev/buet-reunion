const { default: Image } = require("next/image");

const Intro = () => {
  return (
    <div className="relative">
      <span className="block z-10 absolute w-full h-full bg-black bg-opacity-60 inset-0" />

      <div className="absolute w-full h-full inset-0">
        <Image src="/img/about-hero.jpeg" layout="fill" objectFit="cover" />
      </div>
      <div className="relative z-20 pt-32 pb-12 md:pt-40 md:pb-20 px-4 sm:px-6">
        <div className="pb-12 md:pb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl mb-4 font-bold text-white">
            The story behind the BUETian 89
          </h1>
          <p className="text-gray-400 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
