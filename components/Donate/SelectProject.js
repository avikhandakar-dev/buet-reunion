import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaCheckCircle } from "react-icons/fa";

const SelectProject = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  const [selectedProject, setSelectedProject] = useState(null);
  if (loading) {
    return <PulseBar count={3} />;
  }
  return (
    <div className="">
      <h1 className="font-medium lg:text-xl uppercase mb-4 text-gray-600 dark:text-gray-300">
        Select a Project
      </h1>
      <div className="grid gap-4">
        {projects.map((project, idx) => (
          <Fragment key={idx}>
            <div
              onClick={() => setSelectedProject(project)}
              className={`rounded-md w-full p-4 shadow-projectBar duration-300 space-x-8 cursor-pointer flex justify-center items-center relative bg-white dark:bg-gray-800 ${
                selectedProject == project ? "border-2 border-primary" : ""
              }`}
            >
              {selectedProject == project && (
                <span className="text-2xl text-primary absolute right-4 top-4">
                  <FaCheckCircle />
                </span>
              )}
              <div className="flex-shrink-0 bg-gray-300 w-20 h-20 rounded-full overflow-hidden relative">
                {project.coverImage && (
                  <Image
                    placeholder="blur"
                    blurDataURL={project.coverImage.loaderDownloadUrl}
                    src={project.coverImage.thumbDownloadUrl}
                    width={150}
                    height={150}
                    priority={true}
                    objectFit="cover"
                    layout="responsive"
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 200px"
                  />
                )}
              </div>
              <div className="flex-1 flex-grow">
                <p className="uppercase font-semibold text-xs text-primary">
                  {project.category || "Fundraising"}
                </p>
                <p className="uppercase font-semibold text-lg">
                  {project.title}
                </p>
                <div className="relative w-full h-1 rounded-full bg-gray-200 mt-1"></div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SelectProject;
