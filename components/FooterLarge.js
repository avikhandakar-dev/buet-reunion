import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Container from "./Container";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Fragment } from "react/cjs/react.production.min";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import { serverTimestampToString, timestampToString } from "@lib/healper";
import { BsHeartFill } from "react-icons/bs";

const FooterLarge = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc").limit(2)
  );
  return (
    <footer className="">
      <Container bgColor="dark:bg-gradient-dark-1-start bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="flex flex-col space-y-4">
            <p className="font-semibold text-2xl">
              Buetian{" "}
              <span className="text-primary dark:text-yellow-500">89</span>
            </p>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <p className="font-semibold">New Projects</p>
              {!loading && (
                <Fragment>
                  <div className="flex flex-col space-y-6 pt-4">
                    {projects.map((project, idx) => (
                      <Link href={`/projects/${project.slug}`}>
                        <a>
                          <div
                            className="flex space-x-4 justify-start items-start"
                            key={idx}
                          >
                            <div className="w-12 flex-shrink-0 h-12 relative overflow-hidden rounded">
                              <Image
                                placeholder="blur"
                                blurDataURL={
                                  project.coverImage.loaderDownloadUrl
                                }
                                src={project.coverImage.thumbDownloadUrl}
                                objectFit="cover"
                                layout="fill"
                                sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 200px"
                              />
                            </div>
                            <div className="flex-1 flex-grow -mt-1.5">
                              <p className="opacity-50 line-clamp-2">
                                {project.title}
                              </p>
                              <p className="text-xs opacity-30">
                                {serverTimestampToString(project.createdAt)}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <p className="font-semibold">Quick Links</p>
              <div className="flex flex-col space-y-3 pt-2">
                <Link href="/">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Home
                  </a>
                </Link>
                <Link href="/projects">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Projects
                  </a>
                </Link>
                <Link href="/blog">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Blog
                  </a>
                </Link>
                <Link href="/polls">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    About Us
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <p className="font-semibold">Legal</p>
              <div className="flex flex-col space-y-3 pt-2">
                <Link href="/legal/terms">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Terms of Use
                  </a>
                </Link>
                <Link href="/legal/privacy">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Privacy
                  </a>
                </Link>
                <Link href="/legal/cookies">
                  <a className="opacity-50 duration-300 hover:opacity-100">
                    Cookies
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <p className="font-semibold">Get In Touch</p>
              <div className="flex flex-col space-y-3 pt-2">
                <p className="opacity-50">
                  Questions or feedback? <br />
                  We'd love to hear from you.
                </p>
              </div>
              <div className="flex space-x-4 pt-8">
                <a
                  className="text-primary dark:text-yellow-500 duration-300 hover:text-sky dark:hover:text-yellow-400"
                  href="#"
                >
                  <FaFacebookF />
                </a>
                <a
                  className="text-primary dark:text-yellow-500 duration-300 hover:text-sky dark:hover:text-yellow-400"
                  href="#"
                >
                  <FaTwitter />
                </a>
                <a
                  className="text-primary dark:text-yellow-500 duration-300 hover:text-sky dark:hover:text-yellow-400"
                  href="#"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t dark:border-gradient-dark-1-stop border-gray-200 pt-4 mt-16">
          <p className="text-sm">
            <span className="opacity-50">
              Copyright © 2021 all rights reserved by{" "}
            </span>
            <span className="text-primary dark:text-yellow-500">
              Buetian 89
            </span>
          </p>
          <div className="text-sm flex items-center">
            <span className="opacity-50 flex items-center">
              Made with <BsHeartFill className="opacity-50 mx-1 text-xs" /> by
            </span>{" "}
            <a
              href="https://www.alphanumericwebs.com/"
              target="_blank"
              className="text-primary pl-1 dark:text-yellow-500 underline"
            >
              anw
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default FooterLarge;