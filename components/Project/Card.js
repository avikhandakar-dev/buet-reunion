import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <a className="relative block shadow-md group hover:-translate-y-5 duration-300">
        <div className="w-full bg-gray-300 aspect-w-4 aspect-h-4 md:aspect-h-6 dark:bg-gray-700 relative overflow-hidden rounded-md h-auto">
          <div className="absolute bg-black inset-0 w-full h-full bg-opacity-40 z-10" />
          {project.coverImage && (
            <div className="w-full h-full absolute">
              <Image
                placeholder="blur"
                blurDataURL={project.coverImage.loaderDownloadUrl}
                src={project.coverImage.oriDownloadUrl}
                objectFit="cover"
                layout="fill"
              />
            </div>
          )}
          <div className="flex flex-col justify-between h-full absolute z-20 p-8 xl:p-16">
            <p className="uppercase font-semibold text-lg text-white">
              {project.category || "Fundraising"}
            </p>
            <div>
              <h1 className="uppercase mb-8 font-extrabold text-5xl md:text-4xl xl:text-5xl text-white line-clamp-4">
                {project.title}
              </h1>

              <Link href={`/donate?project=${project.slug}`}>
                <a className="px-8 py-3 text-white border-2 border-white font-medium uppercase duration-300 hover:bg-white hover:text-primary whitespace-nowrap">
                  Donate Now
                </a>
              </Link>
            </div>
            <div>
              <BsArrowRight className="group-hover:-rotate-45 duration-300 text-white text-4xl" />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;
