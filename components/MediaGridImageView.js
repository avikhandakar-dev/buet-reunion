import { deleteImage, firestore } from "@lib/firebase";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { RiFileCopy2Fill } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ConfirmModal from "./Confirm";

const MediaGridImageView = ({ image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);

  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("media")
      .doc(image.id)
      .delete()
      .then(async () => {
        const imageDeleted = await deleteImage(image);
        toast.success("Image deleted!");
        setProcessFinished(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        toast.error("Error removing image!");
      });
  };
  return (
    <div className="overflow-hidden relative group rounded-md">
      <div className="absolute w-full h-full bg-black bg-opacity-75 inset-0 z-10 hidden group-hover:flex justify-center items-center rounded-md">
        <ConfirmModal
          body="Do you really want to delete this image? This process cannot be undone."
          className="text-gradient-1-start absolute block right-2 top-2 text-xl cursor-pointer outline-none focus:outline-none"
          buttonIcon={<IoClose />}
          action={handelDelete}
          isLoading={isLoading}
          processFinished={processFinished}
        />
        <CopyToClipboard
          text={image.oriDownloadUrl}
          onCopy={() => toast.success("Copied to clipboard!")}
        >
          <button
            aria-level="Copy to clipboard"
            title="Copy to clipboard"
            disabled={isLoading}
            className="text-gradient-2-start block text-3xl cursor-pointer outline-none focus:outline-none"
          >
            <RiFileCopy2Fill />
          </button>
        </CopyToClipboard>
      </div>
      <div className="w-full relative overflow-hidden rounded-md h-auto transform group-hover:scale-110 transition duration-700">
        <Image
          placeholder="blur"
          blurDataURL={image.loaderDownloadUrl}
          src={image.thumbDownloadUrl}
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
