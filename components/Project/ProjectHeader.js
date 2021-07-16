import Container from "@components/Container";
import Image from "next/image";
import Link from "next/link";

const ProjectSingleHeader = ({ project }) => {
  return (
    <div className="relative overflow-hidden mt-20">
      <div className="w-full bg-gray-300 aspect-w-16 aspect-h-8 md:aspect-h-6 dark:bg-gray-700 relative overflow-hidden h-auto">
        <div className="absolute bg-black inset-0 w-full h-full bg-opacity-40 z-10 rounded-md" />
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
        <Container maxWidth="max-w-3xl h-full absolute z-20">
          <div className="mx-auto max-w-md h-full flex flex-col justify-center items-center sm:items-baseline pt-16 lg:pt-24 pb-16 lg:pb-20 z-20">
            <p className="uppercase font-semibold text-lg text-white">
              {project.category || "Fundraising"}
            </p>
            <h1 className="font-extrabold text-white uppercase text-4xl md:text-5xl lg:text-6xl mb-4">
              {project.title}
            </h1>
            <Link href={`/donate?project=${project.slug}`}>
              <a className="px-8 py-3 text-primary bg-white font-semibold uppercase duration-300 hover:bg-primary hover:text-white whitespace-nowrap w-max">
                Donate Now
              </a>
            </Link>
          </div>
        </Container>
      </div>
      <div className="max-w-3xl mx-auto mb-8 mt-8 px-4 sm:px-6 relative">
        <div className="flex space-x-8 lg:space-x-16 divide-x-2">
          <div className="text-gray-500 text-2xl uppercase flex-shrink-0">
            <p>${project.raised || 0}</p>
            <p className="text-xs font-medium">Raised</p>
          </div>
          <div className="text-gray-500 pl-8 lg:pl-16 text-2xl uppercase flex-shrink-0">
            <p>{project.raised || 0}</p>
            <p className="text-xs font-medium">Days ago</p>
          </div>
          <div className="flex-grow w-full pl-8 lg:pl-16 relative flex justify-center items-center flex-col">
            <div className="relative w-full h-1 bg-gray-300 rounded-full"></div>
            <p className="text-xs font-semibold text-primary uppercase self-start mt-6">
              0% Funded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSingleHeader;
