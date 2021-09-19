import { AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
import Link from "next/link";
import { serverTimestampToString } from "@lib/healper";
import Image from "next/image";

const BlogCard = ({ project }) => {
  const tags = project.tags?.split(",");
  return (
    <div className="rounded-2xl bg-white dark:bg-black h-full dark:bg-opacity-30 bg-opacity-70 shadow-card relative duration-200 hover:-translate-y-2 ease-in-out">
      <Link href={`/blog/${project.slug}`}>
        <a className="block h-full">
          <div className="h-full flex-col flex">
            <div className="flex-shrink-0">
              <div className="w-full relative h-72 bg-gradient-to-br from-gradient-5-start to-gradient-5-stop dark:from-primary dark:to-primary overflow-hidden rounded-t-2xl">
                {project.coverImage && (
                  <Image
                    placeholder="blur"
                    blurDataURL={project.coverImage.loaderDownloadUrl}
                    src={project.coverImage.oriDownloadUrl}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
            <div className="px-6 py-8 md:px-8 md:py-10 flex-1 flex-grow flex flex-col justify-between h-full">
              <div>
                {tags && (
                  <div className="flex mb-3">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="mr-2 capitalize text-yellow-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3
                  className={`font-semibold text-lg md:text-xl lg:text-2xl ${
                    project.excerpt ? "line-clamp-3" : "line-clamp-3"
                  }`}
                >
                  {project.title}
                </h3>
                {/* <p className="font-medium text-opacity-50 text-black line-clamp-3 dark:text-white">
                  {project.excerpt}
                </p> */}
              </div>
              <div className="flex justify-between mt-3 text-sm font-medium">
                <div className="flex justify-center items-center font-light">
                  <span className="mr-2 self-center text-md">
                    <AiOutlineCalendar />
                  </span>
                  {serverTimestampToString(project.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogCard;
