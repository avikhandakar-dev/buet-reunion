import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import Container from "../Container";
import { firestore } from "@lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Image from "next/image";
import date from "date-and-time";
import { getFundingProgress } from "@lib/healper";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Featured = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  const [projects = [], loading, error] = useCollectionData(
    firestore
      .collection("projects")
      .where("published", "==", true)
      .where("featured", "==", true)
      .orderBy("createdAt", "desc")
      .limit(1)
  );

  if (loading) {
    return <></>;
  }
  if (!loading && projects.length < 1) {
    return <></>;
  }

  const project = projects[0];
  const now = new Date();
  const createdAt = new Date(project.createdAt.toDate().toDateString());
  const dateDiff = Math.ceil(date.subtract(now, createdAt).toDays());

  return (
    <AnimateSharedLayout>
      <div className="w-full relative h-full">
        {project.coverImage && (
          <div className="w-full h-full absolute left-0 top-0 opacity-10">
            <Image
              placeholder="blur"
              blurDataURL={project.coverImage.loaderDownloadUrl}
              src={project.coverImage.oriDownloadUrl}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <Container>
          <div className="max-w-xl mx-auto lg:max-w-screen-xl">
            <div className="text-center mb-16">
              <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
                Featured{" "}
                <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-primary to-sky">
                  project
                </span>
              </h1>
              <Link href="/projects">
                <a className="text-xl w-max mx-auto lg:text-2xl transition-colors duration-300 hover:text-primary flex justify-center items-center">
                  View all projects{" "}
                  <span className="">
                    <AiOutlineArrowRight />
                  </span>
                </a>
              </Link>
            </div>
            <div className="grid gap-10 lg:grid-cols-2 sm:px-6">
              <div className="flex items-center justify-center -mx-4 lg:pl-8">
                <div className="grid grid-cols-2 gap-4 w-full lg:max-w-md px-4 lg:px-0 relative">
                  {project.galleryImages?.length &&
                    project.galleryImages.map(
                      (img, idx) =>
                        idx < 4 && (
                          <motion.div
                            layoutId={img.id}
                            onClick={() => setSelectedImage(img)}
                            key={idx}
                            className="relative cursor-pointer shadow-card w-full aspect-w-14 aspect-h-16 rounded-2xl overflow-hidden"
                          >
                            <Image
                              placeholder="blur"
                              blurDataURL={img.loaderDownloadUrl}
                              src={img.oriDownloadUrl}
                              layout="fill"
                              objectFit="cover"
                            />
                          </motion.div>
                        )
                    )}
                  <AnimatePresence>
                    {selectedImage && (
                      <motion.div
                        layoutId={selectedImage?.id}
                        className="absolute cursor-pointer w-full h-full rounded-2xl overflow-hidden"
                        onClick={() => setSelectedImage(false)}
                        transition={spring}
                      >
                        <Image
                          placeholder="blur"
                          blurDataURL={selectedImage.loaderDownloadUrl}
                          src={selectedImage.oriDownloadUrl}
                          layout="fill"
                          objectFit="cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white bg-opacity-70 dark:bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-card flex justify-center items-center flex-col">
                    <p className="font-bold text-5xl text-green-500">
                      {dateDiff || 0}
                    </p>
                    <p className="text-xs font-medium uppercase">Days ago</p>
                  </div>
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white bg-opacity-70 dark:bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-card flex justify-center items-center flex-col">
                    <p className="font-bold text-5xl text-green-500">
                      <span className="text-base align-top">$</span>
                      {project.raised || 0}
                    </p>
                    <p className="text-xs font-medium uppercase">Raised</p>
                  </div>
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white bg-opacity-70 dark:bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-card flex justify-center items-center flex-col relative overflow-hidden">
                    <div
                      className="absolute duration-300 ease-in-out bottom-0 left-0 w-full bg-green-500 h-full flex justify-center items-center flex-col"
                      style={{
                        clipPath: `inset(${
                          100 - getFundingProgress(project.raised, project.goal)
                        }% 0 0 0)`,
                      }}
                    >
                      <p className="font-bold text-5xl text-white">
                        {getFundingProgress(project.raised, project.goal)}
                        <span className="text-base align-middle">%</span>
                      </p>
                      <p className="text-xs font-medium uppercase text-white">
                        Funding
                      </p>
                    </div>
                    <p className="font-bold text-5xl text-green-500">
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
          </div>
        </Container>
      </div>
    </AnimateSharedLayout>
  );
};

export default Featured;
