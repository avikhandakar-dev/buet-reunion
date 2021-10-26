import Image from "next/image";
import { Fragment, useState, useContext } from "react";
import Avatar from "./Avatar";
import PulseBar from "./Pulse/Bar";
import { Country } from "country-state-city";
import { GoQuote } from "react-icons/go";
import { fetchPostJSON, timestampToString } from "@lib/healper";
import { CgSpinner } from "react-icons/cg";
import AuthContext from "@lib/authContext";
import toast from "react-hot-toast";

const ProfileCard = ({ userRecord, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  const getCountryName = (countryCode) => {
    if (!countryCode) {
      return "Unknown";
    }
    const cDetails = Country.getCountryByCode(countryCode);
    return cDetails?.name || countryCode;
  };
  const getUserRole = () => {
    if (!userRecord) {
      return false;
    }
    let roles = [];
    console.log(userRecord.customClaims);
    if (userRecord.customClaims?.admin) {
      roles.push("admin");
    }
    if (userRecord.customClaims?.member) {
      roles.push("member");
    }
    if (userRecord.customClaims?.premium) {
      roles.push("premium");
    }
    if (isSuccess) {
      return "member";
    }
    return roles.join(", ");
  };
  const acceptRequest = async () => {
    setIsLoading(true);
    const token = await user?.getIdToken();
    const response = await fetchPostJSON("/api/users/set-role", {
      uid: userRecord.uid,
      token: token,
      role: "member",
    });
    if (response.statusCode === 500) {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }
    toast.success("Success!");
    setIsSuccess(true);
    setIsLoading(false);
  };
  if (!userRecord) {
    return (
      <Fragment>
        <div className="max-w-xs">
          <PulseBar height="h-64" />
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="xl:max-w-sm relative rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden">
        <div className="relative w-full h-32">
          <Image
            placeholder="blur"
            blurDataURL={`/img/cover/${
              userData.coverPhoto || "cover-default"
            }-loader.jpg`}
            src={`/img/cover/${
              userData.coverPhoto || "cover-default"
            }-thumb.jpg`}
            priority={true}
            objectFit="cover"
            layout="fill"
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 350px, 500px"
          />
        </div>
        <div className="relative">
          <div className="mx-auto w-max -translate-y-1/2">
            <Avatar
              user={userRecord}
              size="w-28 h-28"
              textSize="text-3xl text-white"
              extraClasses="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 dark:bg-green-600 border-4 border-gray-100 dark:border-gray-200"
            />
          </div>
          <div className="p-4 -mt-16">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {userRecord.displayName}
              </p>
              <p className="text-gray-400">{userRecord.email}</p>
              <p className="text-pink-400">
                {getUserRole() && `(${getUserRole()})`}
              </p>
            </div>

            <figure className="mt-4 py-8 pl-12 relative text-xl">
              <div className="absolute top-0 left-0 text-4xl text-yellow-400">
                <GoQuote />
              </div>
              <blockquote className="italic font-serif text-gray-900 dark:text-gray-200">
                Hi, I am <span>{userRecord.displayName}. </span> I live in{" "}
                <span className="text-yellow-500 dark:text-yellow-400">
                  {userData.state || "Unknown"}
                </span>
                , <span>{getCountryName(userData.country)}.</span> My class
                begins at BUET in{" "}
                <span className="text-yellow-500 dark:text-yellow-400">
                  {userData.CBB || "Unknown"}
                </span>
                .
              </blockquote>
              <figcaption className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                -{timestampToString(userRecord.metadata.creationTime)}
              </figcaption>
            </figure>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 mt-2">
            <div className="flex justify-between items-center divide-x divide-gray-300 dark:divide-gray-700">
              <div className="text-center leading-tight px-4 py-2 flex-1 ">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  ${userData.totalDonation || 0}
                </p>
                <p className="text-sm text-gray-400">Donation</p>
              </div>
              <div className="text-center leading-tight px-4 py-2 flex-1 ">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {userData.totalPolls || 0}
                </p>
                <p className="text-sm text-gray-400">Polls</p>
              </div>
              <div className="text-center leading-tight px-4 py-2 flex-1 ">
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {userData.totalComments || 0}
                </p>
                <p className="text-sm text-gray-400">Comments</p>
              </div>
            </div>
          </div>
        </div>
        {userRecord.customClaims?.member ||
        userRecord.customClaims?.premium ||
        isSuccess ? (
          <div className="w-full bg-gradient-to-r text-white from-yellow-500 via-red-500 to-pink-500 h-1" />
        ) : (
          <button
            disabled={isLoading}
            onClick={() => acceptRequest()}
            className="w-full bg-gradient-to-r text-white from-yellow-500 via-red-500 to-pink-500 px-4 py-3 font-semibold duration-300 hover:to-pink-400 hover:from-yellow-600"
          >
            {isLoading ? (
              <span className="inline-flex text-xl animate-spin text-white">
                <CgSpinner />
              </span>
            ) : (
              "Accept"
            )}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default ProfileCard;
