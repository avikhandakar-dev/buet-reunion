import { deleteImage, firestore } from "@lib/firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import AddNewTeam from "./NewTeam";
import Image from "next/image";
import ConfirmModal from "@components/Confirm";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const OurTeam = () => {
  const [members = [], membersLoading] = useCollectionData(
    firestore.collection("team").orderBy("createdAt", "desc")
  );
  const [addNew, setAddNew] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (membersLoading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <span className="inline-flex text-5xl animate-spin text-primary">
          <CgSpinner />
        </span>
      </div>
    );
  }
  const handelDelete = async (member) => {
    setIsLoading(true);
    setProcessFinished(false);
    const deleteImageRes = await deleteImage(member.avatar);
    if (!deleteImageRes) {
      setIsLoading(false);
      return toast.error("Can't delete! Something went wrong!");
    }
    try {
      await firestore.collection("team").doc(member.id).delete();
      toast.success("Team member deleted!");
    } catch (error) {
      toast.error("Error removing team member!");
    }
    setIsLoading(false);
    setProcessFinished(true);
  };
  return (
    <>
      {!addNew && (
        <div className="flex flex-wrap min-h-[70vh]">
          {members.map((member) => (
            <div className="mr-4 mb-4">
              <div className="w-[150px] h-[150px] rounded-md overflow-hidden bg-gray-50 dark:bg-gray-600 flex flex-col justify-center items-center relative">
                <Image
                  placeholder="blur"
                  blurDataURL={member.avatar.loaderDownloadUrl}
                  src={member.avatar.thumbDownloadUrl}
                  objectFit="cover"
                  layout="fill"
                />
                <div title="Delete member" className="absolute top-2 right-2">
                  <span className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
                    <ConfirmModal
                      body="Do you really want to delete this post? This process cannot be undone."
                      className="outline-none focus:outline-none text-red-500 hover:text-red-400 text-lg"
                      buttonIcon={<IoTrashOutline />}
                      action={() => handelDelete(member)}
                      isLoading={isLoading}
                      processFinished={processFinished}
                    />
                  </span>
                </div>
              </div>
              <div className="text-center mt-2 leading-tight w-[150px]">
                <p className="font-bold">{member.name}</p>
                <p className="text-sm dark:text-gray-400 text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={() => setAddNew(true)}
              className="w-[150px] h-[150px] rounded-md bg-gray-50 dark:bg-gray-600 flex flex-col justify-center items-center duration-300 hover:bg-primary hover:text-white"
            >
              <span className="text-5xl">
                <IoMdAdd />
              </span>
            </button>
          </div>
        </div>
      )}
      {addNew && <AddNewTeam goBack={() => setAddNew(false)} />}
    </>
  );
};

export default OurTeam;
