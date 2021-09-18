import { Fragment, useState, useContext } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import ImagePicker from "@components/ImagePicker";
import Image from "next/image";
import MdEditorLite from "@components/MdEditor";
import AuthContext from "@lib/authContext";
import { firestore, serverTimestamp } from "@lib/firebase";
import { CgSpinner } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { GoPlus } from "react-icons/go";

const EditProject = ({ project }) => {
  const [title, setTitle] = useState(project.title || "");
  const [slug, setSlug] = useState(project.slug || "");
  const [tags, setTags] = useState(project.tags || "");
  const [excerpt, setExcerpt] = useState(project.excerpt || "");
  const [galleryImages, setGalleryImages] = useState(
    project.galleryImages || []
  );
  const [goal, setGoal] = useState(project.goal || "");
  const [coverImage, setCoverImage] = useState(project.coverImage || null);
  const [html, setHtml] = useState(project.html || "");
  const [text, setText] = useState(project.text || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  const generateSlug = (str) => {
    return setSlug(encodeURI(kebabCase(str)));
  };
  const handleEditorChange = ({ html, text }) => {
    setHtml(html);
    setText(text);
  };
  const addGalleryImages = (newImages) => {
    setGalleryImages((oldImages) => {
      const combArray = [
        ...oldImages,
        ...newImages.map((img) => {
          const { createdAt, ...filteredObj } = img;
          return filteredObj;
        }),
      ];
      return combArray.filter(
        (tag, index, array) => array.findIndex((t) => t.id == tag.id) == index
      );
    });
  };
  const removeGalleryImage = (id) => {
    setGalleryImages((images) => {
      return images.filter((img) => img.id !== id);
    });
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!title || !text || !html) {
      return toast.error("Project content cannot be empty!");
    }
    if (!slug) {
      return toast.error("Invalid project title!");
    }
    setIsLoading(true);
    setErrorMessage(null);
    firestore
      .collection("projects")
      .doc(project.id)
      .update({
        title,
        slug,
        tags,
        excerpt,
        text,
        html,
        goal,
        galleryImages,
        coverImage,
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
          coverImage?.oriDownloadUrl && "bg-opacity-60 dark:bg-opacity-60"
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <form onSubmit={handelSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold">
                Title
              </div>
              <div className="block xl:col-span-10">
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                    generateSlug(event.target.value);
                  }}
                  value={title}
                  name="title"
                  required
                  type="text"
                  className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                  placeholder="Project title"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold">
                Tags/Categories
              </div>
              <div className="block col-span-10">
                <div className="flex justify-center items-center">
                  <input
                    onChange={(event) => {
                      setTags(event.target.value);
                    }}
                    value={tags}
                    name="tags"
                    required
                    type="text"
                    className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                    placeholder="Separate tags with commas"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold">
                Goal
              </div>
              <div className="block col-span-10">
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
                    placeholder="Donation goal ($)"
                  />

                  <ImagePicker
                    buttonTitle={
                      coverImage ? "Change Cover Image" : "Add Cover Image"
                    }
                    multiple={false}
                    selectedImages={(images) => setCoverImage(images[0])}
                    className="cursor-pointer focus:outline-none inline-flex justify-center items-center px-4 lg:px-16 py-2 flex-shrink-0 bg-gradient-2-start text-green-800 transition-colors duration-300 hover:bg-gradient-2-stop font-medium rounded ml-2"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold self-start">
                Excerpt
              </div>
              <div className="block col-span-10">
                <textarea
                  onChange={(event) => {
                    setExcerpt(event.target.value);
                  }}
                  value={excerpt}
                  name="excerpt"
                  required
                  rows="3"
                  className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                  placeholder="Summary of your project content "
                />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold self-start">
                Content
              </div>
              <div className="col-span-10">
                <MdEditorLite onChange={handleEditorChange} value={text} />
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2 pt-2">
              <div className="xl:col-span-2 text-left xl:text-right font-semibold self-start">
                Gallery
              </div>
              <div className="xl:col-span-10">
                <div className="flex flex-wrap -ml-2">
                  {galleryImages.map((image, idx) => (
                    <div
                      key={idx}
                      className="w-24 h-24 m-2 relative overflow-hidden rounded-md"
                    >
                      <a
                        onClick={() => removeGalleryImage(image.id)}
                        className="absolute text-red-500 text-xl cursor-pointer top-1 right-1 z-10"
                      >
                        <IoMdCloseCircle />
                      </a>
                      <Image
                        placeholder="blur"
                        blurDataURL={image.loaderDownloadUrl}
                        layout="fill"
                        src={image.thumbDownloadUrl}
                        objectFit="cover"
                      />
                    </div>
                  ))}
                  <ImagePicker
                    buttonTitle={<GoPlus />}
                    title="Choose Images"
                    buttonIcon={null}
                    multiple={true}
                    selectedImages={(images) => addGalleryImages(images)}
                    className="w-24 h-24 m-2 text-2xl border-primary text-primary border-2 rounded-md justify-center items-center flex hover:text-white hover:bg-primary duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:gap-8 mb-2">
              <div className="col-span-2" />
              <div className="col-span-10">
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
              </div>
            </div>
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
