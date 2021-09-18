import Container from "@components/Container";

const BlogHeader = () => {
  return (
    <Container>
      <div className="max-w-xl mx-auto text-center pt-16 lg:pt-24">
        <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
          Buetian{" "}
          <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-yellow-400 to-yellow-200 transform rotate-0 inline-block">
            News
          </span>{" "}
        </h1>
        <p className="text-2xl font-medium">Thoughts, stories and ideas.</p>
      </div>
    </Container>
  );
};

export default BlogHeader;
