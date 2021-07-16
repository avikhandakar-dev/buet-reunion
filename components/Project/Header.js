import Container from "@components/Container";

const ProjectsHeader = () => {
  return (
    <Container>
      <div className="max-w-xl mx-auto text-center pt-16 lg:pt-24">
        <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
          Our{" "}
          <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-yellow-400 to-yellow-200 transform rotate-0 inline-block">
            Projects
          </span>{" "}
        </h1>
        <p className="text-2xl font-medium">Things we are working on</p>
      </div>
    </Container>
  );
};

export default ProjectsHeader;
