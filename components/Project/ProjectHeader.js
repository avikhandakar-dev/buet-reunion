import Container from "@components/Container";
import { getFundingProgress } from "@lib/healper";
import Image from "next/image";
import Link from "next/link";
import date from "date-and-time";

const ProjectSingleHeader = ({ project }) => {
  const now = new Date();
  const createdAt = new Date(project.createdAt);
  const dateDiff = Math.ceil(date.subtract(now, createdAt).toDays());
  return (
    <Container>
      <div className="max-w-2xl mx-auto text-center pt-16 lg:pt-24 pb-16 lg:pb-20">
        {/* <p className="font-semibold text-primary">
          {project.tags || "Fundraising"}
        </p> */}
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4">
          {project.title}
        </h1>
        <p className="text-2xl lg:text-3xl lg:leding-relaxed">
          {project.excerpt}
        </p>
      </div>
      <div className="max-w-5xl mx-auto text-center relative">
        {project.coverImage && (
          <div className="w-full relative overflow-hidden rounded-md h-auto transform group-hover:scale-110 transition duration-700">
            <Image
              placeholder="blur"
              blurDataURL={project.coverImage.loaderDownloadUrl}
              src={project.coverImage.oriDownloadUrl}
              width={1000}
              height={400}
              priority={true}
              objectFit="cover"
              layout="responsive"
            />
          </div>
        )}
      </div>
      <div className="max-w-3xl mx-auto mb-8 mt-8 px-4 sm:px-6 relative">
        <div className="flex space-x-8 lg:space-x-16 divide-x-2 dark:divide-gray-700 divide-gray-300">
          <div className="text-gray-500 text-2xl uppercase flex-shrink-0">
            <p>${project.raised || 0}</p>
            <p className="text-xs font-medium">Raised</p>
          </div>
          <div className="text-gray-500 pl-8 lg:pl-16 text-2xl uppercase flex-shrink-0">
            <p>{dateDiff}</p>
            <p className="text-xs font-medium">Days ago</p>
          </div>
          <div className="flex-grow w-full pl-8 lg:pl-16 relative flex justify-center items-center flex-col">
            <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 h-full bg-primary"
                style={{
                  width: `${getFundingProgress(project.raised, project.goal)}%`,
                }}
              />
            </div>
            <p className="text-xs font-semibold text-primary uppercase self-start mt-6">
              {getFundingProgress(project.raised, project.goal)}% Funded
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProjectSingleHeader;
