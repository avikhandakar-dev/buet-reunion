import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import { getFundingProgress } from "@lib/healper";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaCheckCircle } from "react-icons/fa";

const SelectProject = ({ project }) => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    const unsubs = () => {
      project(selectedProject);
    };
    return unsubs();
  }, [selectedProject]);

  if (loading) {
    return <PulseBar count={3} />;
  }

  return (
    <div className="shadow-projectBar rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900">
      <h1 className="font-medium lg:text-xl uppercase bg-green-500 p-4 text-white">
        Select a Project
      </h1>
      <div className="grid gap-4">
        {projects.map((project, idx) => (
          <Fragment key={idx}>
            <div
              onClick={() => setSelectedProject(project)}
              className={`w-full p-4 bg-white duration-300 space-x-8 cursor-pointer flex justify-center items-center relative  dark:bg-gray-800 ${
                selectedProject == project
                  ? "border-2 border-green-500 bg-green-50 bg-opacity-30"
                  : ""
              }`}
            >
              {selectedProject == project && (
                <span className="text-2xl text-green-500 absolute right-4 top-4">
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
                <p className="uppercase font-semibold text-xs text-green-500">
                  {project.category || "Fundraising"}
                </p>
                <p className="uppercase font-semibold text-lg text-gray-600 dark:text-gray-300">
                  {project.title}
                </p>
                <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                  <div
                    className="absolute inset-0 h-full bg-green-500"
                    style={{
                      width: `${getFundingProgress(
                        project.raised,
                        project.goal
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase self-start mt-2">
                  {getFundingProgress(project.raised, project.goal)}% Funded
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SelectProject;
