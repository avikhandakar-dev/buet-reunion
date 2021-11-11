import PulseBar from "@components/Pulse/Bar";
import { firestore } from "@lib/firebase";
import { Fragment, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

const SelectProject = ({ project }) => {
  const [projects = [], loading, error] = useCollectionData(
    firestore
      .collection("projects")
      .where("published", "==", true)
      .where("closed", "==", false)
      .orderBy("createdAt", "desc")
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
    <div className="">
      <h1 className="font-bold font-serif lg:text-xl mb-4 text-gray-600 dark:text-gray-300">
        Project
      </h1>
      <div>
        <Listbox value={selectedProject} onChange={setSelectedProject}>
          {({ open }) => (
            <>
              <div className="relative max-w-xl">
                <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-transparent rounded cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white border-gray-500 rounded-r border-2 dark:border-gray-700 dark:focus:border-gray-700">
                  <span className="block truncate">
                    {selectedProject?.title || "Please select a project..."}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FiChevronDown
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {projects.map((project, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-green-900 bg-green-100"
                              : "text-gray-900"
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={project}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {project.title}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? "text-green-600" : "text-green-600"
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <BsCheck
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      {/* <div className="grid gap-4">
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
      </div> */}
    </div>
  );
};

export default SelectProject;
