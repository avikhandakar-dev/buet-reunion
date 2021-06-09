import Container from "../Container";
import { FiCheck } from "react-icons/fi";

const TheStory = () => {
  return (
    <Container>
      <div className="flex mx-auto flex-col md:flex-row max-w-5xl">
        <div className="pr-10 lg:pr-0 mb-5 md:mb-0 flex-grow">
          <div className="md:max-w-2xl">
            <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
              <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-blue to-sky">
                About
              </span>{" "}
              us
            </h1>
            <p className="text-2xl mb-4 font-medium leading-relaxed">
              The BUETian89 Foundation of North America is a non-profit,
              non-political, non-religious, social organization that promotes
              social and professional connection among the alumni of ex-students
              of BUET 89 batch in North America. Become a Member
            </p>
            <p className="text-lg">
              The organization will serve twofold missions. Firstly,
              the organization will assist its members for professional
              connection, social team building and job search activities.
              Secondly, it will conduct charitable projects, locally and abroad,
              to enlighten and empower communities including members and their
              immediate families and other underprivileged individuals through
              the power of education, technology, and financing.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            Milestones
          </h1>
          <div className="mt-3">
            <p className="flex items-center mb-2">
              <span className="mr-2 text-primary">
                <FiCheck />
              </span>
              Founded in 2021
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2 text-primary">
                <FiCheck />
              </span>
              Funds raised $2.5M
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2 text-primary">
                <FiCheck />
              </span>
              Community of 1K
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2 text-primary">
                <FiCheck />
              </span>
              85K Lives impacted
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TheStory;
