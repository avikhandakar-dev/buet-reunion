// import Image from "next/image";
// import Link from "next/link";
// import { BsArrowRight } from "react-icons/bs";

// const ProjectCard = ({ project }) => {
//   return (
//     <Link href={`/projects/${project.slug}`}>
//       <a className="relative block shadow-md group hover:-translate-y-5 duration-300">
//         <div className="w-full bg-gray-300 aspect-w-4 aspect-h-4 md:aspect-h-6 dark:bg-gray-700 relative overflow-hidden rounded-md h-auto">
//           <div className="absolute bg-black inset-0 w-full h-full bg-opacity-40 z-10" />
//           {project.coverImage && (
//             <div className="w-full h-full absolute">
//               <Image
//                 placeholder="blur"
//                 blurDataURL={project.coverImage.loaderDownloadUrl}
//                 src={project.coverImage.oriDownloadUrl}
//                 objectFit="cover"
//                 layout="fill"
//               />
//             </div>
//           )}
//           <div className="flex flex-col justify-between h-full absolute z-20 p-8 xl:p-16">
//             <p className="uppercase font-semibold text-lg text-white">
//               {project.category || "Fundraising"}
//             </p>
//             <div>
//               <h1 className="uppercase mb-8 font-extrabold text-5xl md:text-4xl xl:text-5xl text-white line-clamp-4">
//                 {project.title}
//               </h1>

//               <Link href={`/donate?project=${project.slug}`}>
//                 <a className="px-8 py-3 text-white border-2 border-white font-medium uppercase duration-300 hover:bg-white hover:text-primary whitespace-nowrap">
//                   Donate Now
//                 </a>
//               </Link>
//             </div>
//             <div>
//               <BsArrowRight className="group-hover:-rotate-45 duration-300 text-white text-4xl" />
//             </div>
//           </div>
//         </div>
//       </a>
//     </Link>
//   );
// };

// export default ProjectCard;

import { useState } from "react";
import { AiOutlineUser, AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
import Image from "next/image";
import { serverTimestampToString } from "@lib/healper";

const ProjectCard = ({ project }) => {
  const [hover, setHover] = useState(false);
  const tags = project.tags?.split(",");
  const noImgCss = project.imageURL ? null : "p-4  shadow-blogCard";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`rounded-md shadow-blogCard bg-black bg-opacity-30 hover:bg-black hover:shadow-none border-2 border-transparent hover:border-white relative`}
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
      {project.coverImage && (
        <div className="w-full relative aspect-w-10 aspect-h-6 overflow-hidden rounded-t-md">
          <Image
            placeholder="blur"
            blurDataURL={project.coverImage.loaderDownloadUrl}
            src={project.coverImage.oriDownloadUrl}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <div className="p-4 md:p-6">
        {tags && (
          <div className="flex mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="mr-2 px-3 py-1 text-xs text-yellow-800 bg-yellow-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-semibold line-clamp-2 text-white text-lg md:text-xl lg:text-2xl">
          {project.title}
        </h3>
        <p className="text-gray-200 font-medium">{project.excerpt}</p>
        <div className="flex text-white justify-between mt-3 text-sm font-medium">
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineUser />
            </span>
            <span>{project.authorName}</span>
          </div>
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineCalendar />
            </span>
            {serverTimestampToString(project.createdAt, "MMM DD, YYYY")}
          </div>
          <div className="flex justify-center items-center">
            <span className="mr-2 self-center text-md">
              <AiOutlineEye />
            </span>
            {project.views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
