import Image from "next/image";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { Fragment } from "react/cjs/react.production.min";
import Avatar from "./Avatar";
import PulseBar from "./Pulse/Bar";

const ProfileCard = ({ userRecord, userData }) => {
  if (!userRecord) {
    return (
      <Fragment>
        <div className="max-w-xs">
          <PulseBar />
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="max-w-xs relative rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden">
        <div className="relative w-full h-32">
          <Image
            placeholder="blur"
            blurDataURL="/img/cover/cover-default-loader.jpg"
            src="/img/cover/cover-default-thumb.jpg"
            priority={true}
            objectFit="cover"
            layout="fill"
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 350px, 500px"
          />
        </div>
        <div>
          <div className="flex justify-center items-center -translate-y-1/2">
            <Avatar
              user={userRecord}
              size={28}
              textSize="3xl"
              extraClasses="bg-green-100 dark:bg-green-600"
            />
          </div>
          <div className="p-4 -mt-16">
            <div className="text-center">
              <p className="text-xl font-semibold">{userRecord.displayName}</p>
              <p className="text-gray-400">{userRecord.email}</p>
            </div>
            <div className="flex justify-around mt-4">
              <div className="flex items-center">
                <FaGlobeAmericas className="mr-2" />
                {userData.country || "Unknown"}
              </div>
              <div className="flex items-center">
                <GiModernCity className="mr-2" />
                {userData.state || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileCard;
