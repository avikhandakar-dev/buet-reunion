import { timestampToString } from "@lib/healper";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";
import Image from "next/image";
import Link from "next/link";

const DonationsBoxRow = ({ donation }) => {
  const [project = [], loading, error] = useDocumentData(
    firestore.collection("projects").doc(donation.projectId)
  );
  return (
    <div className="flex justify-evenly px-4 py-3">
      <div className="flex items-center flex-1">
        <div className="flex-shrink-0 h-10 w-10 relative">
          <div className="w-full relative overflow-hidden rounded h-auto transform group-hover:scale-110 transition duration-700">
            <Image
              placeholder="blur"
              blurDataURL={
                project.coverImage?.loaderDownloadUrl || "/img/no-image.png"
              }
              src={project.coverImage?.thumbDownloadUrl || "/img/no-image.png"}
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
              <a className="text-sm line-clamp-2 font-medium text-gray-900 dark:text-gray-100">
                {project.title}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 text-center">${donation.amount}</div>
      <div className="flex-1 text-right">
        {timestampToString(donation.createdAt)}
      </div>
    </div>
  );
};

export default DonationsBoxRow;
