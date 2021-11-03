import { Spin } from "@components/Svg/Spin";
import addCollection from "@lib/addCollection";
import { serverTimestamp, uploadImage } from "@lib/firebase";
import { nanoid } from "nanoid";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoCloudUpload } from "react-icons/io5";

const AddNewTeam = ({ goBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [fileError, setFileError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { addDoc } = addCollection("team");

  const handelFileChange = (event) => {
    const imageTypes = ["image/png", "image/jpeg"];
    const selected = event.target.files[0];
    if (selected && imageTypes.includes(selected.type)) {
      setImageFile(selected);
      setFileError(null);
    } else {
      setImageFile(null);
      setFileError("Please select an image file (png or jpeg)");
    }
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!imageFile) {
      return toast.error("You must choose an avatar!");
    }
    setIsLoading(true);
    const {
      oriPath,
      oriDownloadUrl,
      thumbPath,
      thumbDownloadUrl,
      loaderPath,
      loaderDownloadUrl,
      fileName,
    } = await uploadImage({
      file: imageFile,
      folder: "team",
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
      return toast.error("Something went wrong! Can't upload avatar!");
    }
    const id = nanoid();
    const addMember = await addDoc(
      {
        avatar: {
          oriPath,
          oriDownloadUrl,
          thumbPath,
          thumbDownloadUrl,
          loaderPath,
          loaderDownloadUrl,
        },
        id,
        name,
        role,
        createdAt: serverTimestamp(),
      },
      id
    );
    if (!addMember) {
      toast.error("Failed! Server error!");
      setIsLoading(false);
    } else {
      toast.success("Success!");
      goBack();
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 items-start min-h-[70vh]">
      <form
        className="w-full max-w-lg bg-gray-100 shadow-md dark:bg-gray-600 rounded-md pb-4"
        onSubmit={(event) => handelSubmit(event)}
      >
        <div className="text-white font-semibold px-4 py-3 bg-green-500 rounded-t-md flex space-x-2">
          <button
            disabled={isLoading}
            onClick={goBack}
            className="flex space-x-1 items-center duration-300 hover:text-yellow-400"
          >
            <BiArrowBack />
            {/* <span className="italic text-sm font-medium">Back</span> */}
          </button>
          <span>Add New Member</span>
        </div>

        <div className="p-4">
          <div className="grid gap-2 mb-2">
            <div className="text-left font-semibold">Name</div>
            <div className="block">
              <input
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
                name="name"
                required
                type="text"
                className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 px-2 py-2"
              />
            </div>
          </div>

          <div className="grid gap-2 mb-2">
            <div className="text-left font-semibold">
              Role{" "}
              <span className="text-gray-600 dark:text-gray-400 font-light">
                (optional)
              </span>
            </div>
            <div className="block">
              <input
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                value={role}
                name="role"
                type="text"
                className="block dark:placeholder-gray-400 rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 px-2 py-2"
              />
            </div>
          </div>

          <div className="grid gap-2 mb-2">
            <div className="text-left font-semibold">Avatar</div>
            <div className="block">
              <label className="text-sm cursor-pointer font-semibold px-16 py-4 border-2 border-green-500 text-green-500 duration-300 hover:bg-green-500 hover:text-white rounded-md flex flex-col justify-center items-center w-max">
                <span className="text-2xl">
                  <IoCloudUpload />
                </span>
                <p>Upload</p>
                <input
                  onChange={(event) => handelFileChange(event)}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            {imageFile && (
              <p className="text-sm font-semibold text-yellow-500">
                {imageFile.name}
              </p>
            )}
            {fileError && <p className="text-red-500">{fileError}</p>}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white font-semibold w-full block max-w-xs px-4 py-2 bg-primary rounded-md mt-8 duration-300 hover:bg-sky"
          >
            {isLoading ? (
              <span className="inline-flex">
                <Spin />
                Please wait
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTeam;
