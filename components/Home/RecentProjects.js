import Link from "next/link";
import Container from "../Container";
import ProjectCard from "../ProjectCard";
import { BsChevronDoubleRight } from "react-icons/bs";
const Projects = [
  {
    name: "Winter blanket distribution",
    slug: "winter-blanket-distribution",
    desc: "Like every year, BUET-87 foundation has started a project to distribute blankets to poor people in remote areas of Bangladesh to help them cope with the winter chill. Please use the button below to donate to this project.",
  },
  {
    name: "Fund raiser for engineer delwoar",
    slug: "winter-blanket-distribution",
    desc: "Buet 87 Foundation is joining hands with Forum 86 and BIN (Buetian Investment Network) in demanding justice for the brutal murder of Engineer Delowar Hossain.",
  },
  {
    name: "Fund raiser for engr. masum khan",
    slug: "winter-blanket-distribution",
    desc: "Our friend Masum from NAME department has been suffering from Kidney complications and now both of his kidneys have failed and needs immediate transplant for saving his life.",
  },
  {
    name: "COVID-19 food distribution",
    slug: "winter-blanket-distribution",
    desc: "In this quarantined situation, where the period of lock-down may easily extend from 10 days to a month or more, people who live on daily wages will be suffering the most to make ends meet. BUET 87 Foundation has rapidly mobilized its efforts to reach out to those poor families during this countrywide lock-down.",
  },
  {
    name: "BUET 87 Foundation Scholarships",
    slug: "winter-blanket-distribution",
    desc: "BUET87 Foundation started a project in 2011 to provide a single scholarship for a year to one such kid in the rural Bangladesh.",
  },
];

const RecentProjects = () => {
  return (
    <Container>
      <div className="pb-10 md:pb-16">
        <div className="text-center mb-8">
          <p className="uppercase font-medium text-gray-500 dark:text-gray-300">
            Current projects —
          </p>
          <h1 className="font-bold text-3xl md:text-4xl">
            Stuff We're Working On
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-3">
          {Projects.map((item, idx) => (
            <ProjectCard project={item} colorIndex={idx} key={idx} />
          ))}
          <div className="w-full h-full flex justify-center items-center">
            <Link href="/projects">
              <a className="text-xl font-semibold flex justify-center items-center hover:text-primary transition-colors duration-200">
                <span className="text-5xl">
                  <BsChevronDoubleRight />
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecentProjects;
