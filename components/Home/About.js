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
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit laborum — semper quis lectus nulla.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
