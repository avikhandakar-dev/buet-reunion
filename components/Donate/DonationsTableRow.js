import { Fragment, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import toast from "react-hot-toast";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import ConfirmModal from "@components/Confirm";
import {
  BlobToBase64,
  fetchPostJSON,
  serverTimestampToString,
} from "@lib/healper";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { BiDownload } from "react-icons/bi";
import { FaHourglassEnd } from "react-icons/fa";
import { RiMailSendFill } from "react-icons/ri";
import fileDownload from "js-file-download";

const DonationsTableRow = ({ donation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const [project = [], loading, error] = useDocumentData(
    firestore.collection("projects").doc(donation.projectId)
  );
  const handelDelete = () => {
    setIsLoading(true);
    setProcessFinished(false);
    firestore
      .collection("donations")
      .doc(donation.id)
      .delete()
      .then(() => {
        toast.success("Donation deleted!");
        setProcessFinished(true);
        return setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setProcessFinished(true);
        return toast.error("Error removing doc!");
      });
  };
  const fetchPDFData = async () => {
    const response = await fetch("/api/generate-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donation,
        date: serverTimestampToString(donation.createdAt),
      }),
    });
    if (response.status === 200) {
      return response.arrayBuffer();
    } else {
      return false;
    }
  };
  const downloadReceipt = async () => {
    setIsDownloading(true);
    const buffer = await fetchPDFData();
    if (buffer) {
      const blob = new Blob([buffer]);
      fileDownload(blob, "Receipt.pdf");
      setIsDownloading(false);
    } else {
      toast.error("Can't download receipt! Something went wrong :(");
      setIsDownloading(false);
    }
  };
  const sendReceipt = async () => {
    setIsSending(true);
    const buffer = await fetchPDFData();
    if (buffer) {
      const blob = new Blob([buffer]);
      try {
        const base64 = await BlobToBase64(blob);
        const response = await fetchPostJSON("/api/mail/send-receipt", {
          email: donation.donorInfo?.email,
          attachment: base64,
        });
        if (response.statusCode === 200) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        setIsSending(false);
      } catch (error) {
        toast.error("Can't send receipt! Something went wrong :(");
        setIsSending(false);
      }
    } else {
      toast.error("Can't send receipt! Something went wrong :(");
      setIsSending(false);
    }
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 relative">
            <div className="w-full relative overflow-hidden rounded h-auto transform group-hover:scale-110 transition duration-700">
              <Image
                placeholder="blur"
                blurDataURL={
                  project.coverImage?.loaderDownloadUrl || "/img/no-image.png"
                }
                src={
                  project.coverImage?.thumbDownloadUrl || "/img/no-image.png"
                }
                width={40}
                height={40}
                priority={true}
                objectFit="cover"
                layout="responsive"
                sizes="40px"
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="">
              <Link href={`/projects/${project.slug}`}>
                <a className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {donation.projectInfo?.projectTitle}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          ${donation.amount}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {donation.donorInfo?.name || "-"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {donation.donorInfo?.email || "-"}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {donation.paymentMethod}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {serverTimestampToString(donation.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span title="Download" className="mr-3">
            <button
              onClick={() => downloadReceipt()}
              className="text-green-500 hover:text-green-400 text-lg"
              disabled={isDownloading}
            >
              {isDownloading ? <FaHourglassEnd /> : <BiDownload />}
            </button>
          </span>
          <span title={`Send to ${donation.donorInfo?.email}`} className="mr-3">
            <button
              onClick={() => sendReceipt()}
              disabled={isSending}
              className="text-yellow-500 hover:text-yellow-400 text-lg"
            >
              {isSending ? <FaHourglassEnd /> : <RiMailSendFill />}
            </button>
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center items-center">
          <span className="flex justify-center items-center">
            <ConfirmModal
              body="Do you really want to delete this donation? This process cannot be undone."
              className="outline-none focus:outline-none text-red-500 hover:text-red-400 text-lg"
              buttonIcon={<IoTrashOutline />}
              action={handelDelete}
              isLoading={isLoading}
              processFinished={processFinished}
            />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default DonationsTableRow;
