import Image from "next/image";
import date from "date-and-time";
import { getFundingProgress } from "@lib/healper";
import Button from "../Button";
import Link from "next/link";

const FeaturedProjectSlide = ({ project }) => {
  const now = new Date();
  const createdAt = new Date(project.createdAt.toDate().toDateString());
  const dateDiff = Math.ceil(date.subtract(now, createdAt).toDays());

  return (
    <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 sm:px-6">
      <div className="flex items-center justify-center lg:pl-8">
        <div className="w-full px-4 lg:px-0 relative">
          <span className="absolute hidden lg:block w-full h-full rounded-md top-2 -left-2 border-2 bg-green-400 border-green-400 opacity-60" />
          <div className="relative shadow-card w-full aspect-w-6 aspect-h-3 lg:aspect-h-6 rounded-md overflow-hidden">
            <Image
              placeholder="blur"
              blurDataURL={project.coverImage.loaderDownloadUrl}
              src={project.coverImage.oriDownloadUrl}
              layout="fill"
              objectFit="cover"
              priority={true}
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
        <div className="max-w-xl mb-6">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold sm:text-4xl sm:leading-none">
            {project.title}
          </h2>
          <p className="text-base line-clamp-3 text-gray-700 dark:text-gray-200 md:text-lg">
            {project.excerpt}
          </p>
        </div>
        <div className="flex space-x-4 mb-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-gray-700 rounded-2xl shadow-card flex justify-center items-center flex-col">
            <p className="font-bold text-2xl sm:text-5xl text-green-500">
              {dateDiff || 0}
            </p>
            <p className="text-xs font-medium uppercase">Days ago</p>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-gray-700 rounded-2xl shadow-card flex justify-center items-center flex-col">
            <p className="font-bold text-2xl sm:text-5xl text-green-500">
              <span className="text-base align-top">$</span>
              {project.raised || 0}
            </p>
            <p className="text-xs font-medium uppercase">Raised</p>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-gray-700 rounded-2xl shadow-card flex justify-center items-center flex-col relative overflow-hidden">
            <div
              className="absolute duration-300 ease-in-out bottom-0 left-0 w-full bg-green-500 h-full flex justify-center items-center flex-col"
              style={{
                clipPath: `inset(${
                  100 - getFundingProgress(project.raised, project.goal)
                }% 0 0 0)`,
              }}
            >
              <p className="font-bold text-2xl sm:text-5xl text-white">
                {getFundingProgress(project.raised, project.goal)}
                <span className="text-base align-middle">%</span>
              </p>
              <p className="text-xs font-medium uppercase text-white">
                Funding
              </p>
            </div>
            <p className="font-bold text-2xl sm:text-5xl text-green-500">
              {getFundingProgress(project.raised, project.goal)}
              <span className="text-base align-middle">%</span>
            </p>
            <p className="text-xs font-medium uppercase">Funding</p>
          </div>
        </div>
        <div className="flex">
          <Button title="Donate Now" href="/donate" />
          <Link href={`/projects/${project.slug}`}>
            <a className="inline-flex ml-5 items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
              View project
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectSlide;
