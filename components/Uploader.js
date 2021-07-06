import addCollection from "@lib/addCollection";
import AuthContext from "@lib/authContext";
import { serverTimestamp, uploadImage } from "@lib/firebase";
import { nanoid } from "nanoid";
import { useState, useEffect, useContext, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { BiError } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { MdCloudDone } from "react-icons/md";
const Uploader = () => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const { addDoc } = addCollection("media");
  const [progress, setProgress] = useState(0);
  const [processFinished, setProcessFinished] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { acceptedFiles, getRootProps, open, getInputProps } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: async (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      if (acceptedFiles.length > 0) {
        setIsLoading(true);
        for (const [idx, file] of acceptedFiles.entries()) {
          const {
            oriPath,
            oriDownloadUrl,
            thumbPath,
            thumbDownloadUrl,
            loaderPath,
            loaderDownloadUrl,
            fileName,
          } = await uploadImage({
            file: file,
            folder: "media",
            format: "JPEG",
          });
          if (
            !oriPath ||
            !oriDownloadUrl ||
            !thumbPath ||
            !thumbDownloadUrl ||
            !loaderPath ||
            !loaderDownloadUrl ||
            !fileName
          ) {
            setUploadError(true);
            break;
          } else {
            const id = nanoid();
            const uploadMedia = await addDoc(
              {
                oriPath,
                oriDownloadUrl,
                thumbPath,
                thumbDownloadUrl,
                loaderPath,
                loaderDownloadUrl,
                id,
                fileName,
                userId: user?.uid,
                userName: user?.displayName,
                userEmail: user.email,
                createdAt: serverTimestamp(),
              },
              id
            );
            if (!uploadMedia) {
              toast.error("Upload failed! Server error!");
              setUploadError(true);
              break;
            } else {
              setUploadError(false);
            }
          }
          setProgress(Math.round(((idx + 1) / acceptedFiles.length) * 100));
        }
        setProcessFinished(true);
        setIsLoading(false);
        if (uploadError) {
          toast.error("Upload failed!");
        } else {
          toast.success("Successfully uploaded!");
        }
      }
    },
  });
  const thumbs = files.map((file, idx) => (
    <div className="w-full relative" key={idx}>
      <div className="relative w-full h-auto rounded-md overflow-hidden">
        <img src={file.preview} className="w-full h-full object-cover" />
      </div>
    </div>
  ));
  const reset = () => {
    setIsLoading(false);
    setUploadError(false);
    setProcessFinished(false);
    setFiles([]);
  };
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div className="rounded-md bg-gray-100 dark:bg-gray-600 shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Upload
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-5">
        {!isLoading && !processFinished && (
          <div
            className="py-4 px-5 border-4 lg:border-8 border-dashed border-gray-200 dark:border-gray-600 dark:bg-gray-700 h-80 flex flex-col justify-center items-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <h1 className="text-3xl mb-3 lg:text-4xl text-gray-400 font-medium">
              Drag images here
            </h1>
            <p className="text-gray-400">Or, if you prefer...</p>
            <a
              onClick={open}
              className="flex cursor-pointer mt-2 border-2 rounded px-5 py-3 dark:border-gradient-1-start border-gradient-4-start dark:text-gradient-1-start text-gradient-4-start uppercase font-medium justify-center items-center transition-colors duration-300 hover:text-yellow-800 dark:hover:bg-gradient-1-start hover:bg-gradient-4-start"
            >
              <IoIosImages className="mr-2 text-xl" />
              Choose images to upload
            </a>
          </div>
        )}
        {processFinished && (
          <div className="py-4 px-5 dark:bg-gray-700 h-80 flex flex-col justify-center items-center">
            {uploadError ? (
              <Fragment>
                <div className="text-center">
                  <BiError className="text-7xl mx-auto text-red-500" />
                  <h1 className="font-medium text-4xl">Failed!</h1>
                  <button
                    onClick={reset}
                    className="outline-none focus:outline-none px-5 py-2 border-2 mt-2 text-gradient-4-start transition-color duration-300 font-medium hover:text-yellow-900 hover:bg-gradient-4-start border-gradient-4-start rounded"
                  >
                    Try again
                  </button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="text-center">
                  <MdCloudDone className="text-7xl mx-auto text-green-400" />
                  <h1 className="font-medium text-4xl">Success!</h1>
                  <button
                    onClick={reset}
                    className="outline-none focus:outline-none px-5 py-2 border-2 mt-2 text-gradient-4-start transition-color duration-300 font-medium hover:text-yellow-900 hover:bg-gradient-4-start border-gradient-4-start rounded"
                  >
                    Upload more
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        )}
        {isLoading && (
          <div className="py-4 px-5 dark:bg-gray-700 h-80 flex flex-col justify-center items-center">
            <div className="relative pt-1 w-full mx-auto max-w-xl">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 uppercase rounded-full tracking-widest">
                    Uploading...
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-pink-600">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {files.length > 0 && (
        <aside className="py-4 px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-around justify-items-stretch gap-4 relative">
          {thumbs}
        </aside>
      )}
    </div>
  );
};

export default Uploader;
