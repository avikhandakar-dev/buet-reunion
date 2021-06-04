import Link from "next/link";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
const ProjectCard = ({ project, colorIndex }) => {
  const [hover, setHover] = useState(false);
  const Colors = [
    "bg-gradient-to-bl from-gradient-1-start to-gradient-1-stop",
    "bg-gradient-to-bl from-gradient-2-start to-gradient-2-stop",
    "bg-gradient-to-bl from-gradient-3-start to-gradient-3-stop",
    "bg-gradient-to-bl from-gradient-4-start to-gradient-4-stop",
    "bg-gradient-to-bl from-gradient-5-start to-gradient-5-stop",
  ];
  const index = colorIndex % Colors.length;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`p-8 h-72 sm:h-80 lg:h-96 rounded-md flex flex-col justify-between relative ${
        hover
          ? "bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white"
          : `${Colors[index]} text-black`
      }`}
    >
      <div
        className={`absolute top-3 border-2 border-black rounded-md dark:border-white ${
          !hover ? "hidden" : "block"
        }`}
        style={{
          width: "calc(100% + 15px)",
          height: "100%",
          zIndex: "-1",
          right: "-2px",
        }}
      />
      <div className="self-end text-2xl">
        <MdOpenInNew />
      </div>
      <div className="self-center">
        <h1
          className={`text-2xl lg:text-3xl origin-left transform uppercase font-bold opacity-60 transition-all duration-500 ${
            hover
              ? `bg-clip-text text-transparent opacity-100 md:text-xl lg:scale-75 ${Colors[index]}`
              : ""
          }`}
        >
          {project.name}
        </h1>
        <div
          className={`font-medium h-0 overflow-hidden transition-all duration-500 ease-in-out ${
            hover ? " h-16 sm:h-20 md:h-28 lg:h-36" : ""
          }`}
        >
          {project.desc}
        </div>
        <div className={`mt-10 flex-shrink-0`}>
          <Link href="/">
            <a className="uppercase text-xs font-semibold tracking-widest">
              Donate Here
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
