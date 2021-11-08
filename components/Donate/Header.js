import Container from "../Container";

const DonateHeader = () => {
  return (
    <Container>
      <div className="max-w-xl mx-auto text-center pt-16 lg:pt-24">
        <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
          <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-gradient-6-start to-gradient-6-stop transform rotate-0 inline-block">
            Donate
          </span>{" "}
          Now
        </h1>
        <p className="text-2xl font-medium">
          No matter the amount, your donation makes a difference.
        </p>
      </div>
    </Container>
  );
};

export default DonateHeader;
