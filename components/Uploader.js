import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosImages } from "react-icons/io";
const Uploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { acceptedFiles, getRootProps, open, getInputProps } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setIsLoading(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file, idx) => (
    <div className="w-full relative" key={idx}>
      <div className="relative w-full h-auto rounded-md overflow-hidden">
        <img src={file.preview} className="w-full h-full object-cover" />
      </div>
    </div>
  ));
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
        {!isLoading && (
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
          {console.log(files)}

          {thumbs}
        </aside>
      )}
    </div>
  );
};

export default Uploader;
