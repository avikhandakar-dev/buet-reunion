import { Fragment, useState, useContext } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import ImagePicker from "@components/ImagePicker";
import Image from "next/image";
import MdEditorLite from "@components/MdEditor";
import AuthContext from "@lib/authContext";
import { firestore, serverTimestamp } from "@lib/firebase";
import { CgSpinner } from "react-icons/cg";

const EditProject = ({ project }) => {
  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [goal, setGoal] = useState(project.goal);
  const [coverImage, setCoverImage] = useState(project.coverImage || null);
  const [html, setHtml] = useState(project.html);
  const [text, setText] = useState(project.text);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  const generateSlug = () => {
    if (!title) {
      return toast.error("First give a title!");
    }
    return setSlug(encodeURI(kebabCase(title)));
  };
  const handleEditorChange = ({ html, text }) => {
    setHtml(html);
    setText(text);
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!title || !slug || !text || !html) {
      return toast.error("Project description cannot be empty!");
    }
    setIsLoading(true);
    setErrorMessage(null);
    firestore
      .collection("projects")
      .doc(project.id)
      .update({
        title,
        slug,
        text,
        html,
        goal,
        coverImage: coverImage,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid,
      })
      .then(() => {
        setIsLoading(false);
        toast.success("Project updated!");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
        toast.error("Update failed!");
      });
  };
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      {coverImage?.oriDownloadUrl && (
        <Fragment>
          <div className="w-full h-full absolute inset-0 pointer-events-none">
            <Image
              src={coverImage.loaderDownloadUrl}
              layout="fill"
              objectFit="cover"
              priority={true}
              loading="eager"
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1000px"
            />
          </div>
        </Fragment>
      )}
      <div className="py-4 px-5 bg-white dark:bg-gray-700 relative">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Update project
        </p>
      </div>
      <div
        className={`py-4 px-5 relative bg-gray-50 dark:bg-gray-700 flex flex-col justify-center items-center ${
          coverImage?.oriDownloadUrl && "bg-opacity-60"
        }`}
      >
        <div className="max-w-4xl mx-auto w-full">
          <form onSubmit={handelSubmit}>
            <div className="block mb-2">
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
                name="title"
                required
                type="text"
                className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                placeholder="Project Title"
              />
            </div>
            <div className="block mb-2">
              <div className="flex justify-center items-center">
                <input
                  onChange={(event) => {
                    setSlug(event.target.value);
                  }}
                  value={slug}
                  name="slug"
                  required
                  type="text"
                  className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                  placeholder="Slug"
                />
                <a
                  onClick={generateSlug}
                  className="cursor-pointer px-4 lg:px-16 py-2 flex-shrink-0 bg-gradient-1-start text-yellow-800 transition-colors duration-300 hover:bg-gradient-1-stop font-medium ml-2 rounded"
                >
                  Auto Generate
                </a>
              </div>
            </div>
            <div className="block mb-2">
              <div className="flex justify-center items-center">
                <input
                  onChange={(event) => {
                    setGoal(event.target.value);
                  }}
                  value={goal}
                  name="goal"
                  required
                  type="number"
                  className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                  placeholder="Donation Goal ($)"
                />

                <ImagePicker
                  buttonTitle="Add Cover Image"
                  multiple={false}
                  selectedImages={(images) => setCoverImage(images[0])}
                  className="cursor-pointer focus:outline-none inline-flex justify-center items-center px-4 lg:px-16 py-2 flex-shrink-0 bg-gradient-2-start text-green-800 transition-colors duration-300 hover:bg-gradient-2-stop font-medium rounded ml-2"
                />
              </div>
            </div>
            <MdEditorLite onChange={handleEditorChange} value={text} />
            <button
              type="submit"
              disabled={isLoading}
              className="px-16 py-2 inline-flex items-center justify-center font-medium mt-4 text-white bg-primary transition-colors duration-300 hover:bg-sky outline-none focus:outline-none rounded"
            >
              {isLoading ? (
                <span className="inline-flex text-2xl animate-spin text-white">
                  <CgSpinner />
                </span>
              ) : (
                "Update"
              )}
            </button>
            {errorMessage ? (
              <div className=" text-red-500 py-2 text-sm font-medium w-full text-center">
                {errorMessage}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
