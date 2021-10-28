const { default: Image } = require("next/image");

const Intro = () => {
  return (
    <div className="relative mt-20">
      <span className="block z-10 absolute w-full h-full bg-black bg-opacity-60 inset-0" />

      <div className="absolute w-full h-full inset-0">
        <Image src="/img/about-hero.jpeg" layout="fill" objectFit="cover" />
      </div>
      <div className="relative z-20 pt-32 pb-12 md:pt-40 md:pb-20 px-4 sm:px-6">
        <div className="pb-12 md:pb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl xl:text-7xl mb-4 font-black text-white uppercase">
            We are buetian <span className="text-primary">89</span> North
            America
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Intro;
