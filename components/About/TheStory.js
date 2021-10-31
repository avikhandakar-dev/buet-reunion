import Container from "../Container";
import { FiCheck } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

const TheStory = () => {
  return (
    <Container>
      <div className="flex mx-auto flex-col md:flex-row max-w-5xl">
        <div className="pr-10 lg:pr-0 mb-5 md:mb-0 flex-grow">
          <div className="md:max-w-2xl">
            <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
              <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-primary to-sky">
                About
              </span>{" "}
              us
            </h1>
            <p className="text-2xl mb-4 font-medium leading-relaxed">
              The BUETian89 Foundation of North America is a non-profit,
              non-political, non-religious, social organization that promotes
              social and professional connection among the alumni of ex-students
              of BUET 89 batch in North America.
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
            Our Constitution
          </h1>
          <div className="mt-4 flex md:grid grid-cols-2 gap-4 -ml-2 md:ml-0">
            <div className="">
              <a
                className="duration-300 hover:text-primary"
                href="/constitution.pdf"
                target="_blank"
              >
                <FaFilePdf className="text-8xl" />
                <p className="text-xs font-semibold mt-2 pl-3">Constitution</p>
              </a>
            </div>
            <div>
              <a
                className="duration-300 hover:text-primary"
                href="https://businesssearch.sos.ca.gov/CBS/SearchResults?filing=&SearchType=CORP&SearchCriteria=BUETian89+Foundation&SearchSubType=Keyword"
                target="_blank"
              >
                <img src="/img/seal-of-california.svg" width="95" />
                <p className="text-xs font-semibold mt-2 pl-2">
                  State of California
                  <br /> Approval
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TheStory;
