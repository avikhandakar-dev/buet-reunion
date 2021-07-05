import { deleteImage, firestore } from "@lib/firebase";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { RiFileCopy2Fill } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MediaGridImageView = ({ image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handelDelete = () => {
    setIsLoading(true);
    firestore
      .collection("media")
      .doc(image.id)
      .delete()
      .then(async () => {
        const imageDeleted = await deleteImage(image.filePath);
        toast.success("Image deleted!");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error removing image!");
      });
  };
  return (
    <div className="overflow-hidden relative group rounded-md">
      <div className="absolute w-full h-full bg-black bg-opacity-75 inset-0 z-10 hidden group-hover:flex justify-center items-center">
        <button
          onClick={handelDelete}
          disabled={isLoading}
          className="text-gradient-1-start absolute block right-2 top-2 text-xl cursor-pointer outline-none focus:outline-none"
        >
          <IoClose />
        </button>
        <CopyToClipboard
          text={image.downloadUrl}
          onCopy={() => toast.success("Copied to clipboard!")}
        >
          <button
            disabled={isLoading}
            className="text-gradient-2-start block text-3xl cursor-pointer outline-none focus:outline-none"
          >
            <RiFileCopy2Fill />
          </button>
        </CopyToClipboard>
      </div>
      <div className="w-full relative overflow-hidden rounded-md h-auto transform group-hover:scale-110 transition duration-700">
        <Image
          src={image.downloadUrl}
          width={150}
          height={150}
          priority={true}
          objectFit="cover"
          layout="responsive"
          sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 200px"
        />
      </div>
    </div>
  );
};

export default MediaGridImageView;
