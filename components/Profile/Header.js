import { AuthContext } from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";

const ProfileHeader = () => {
  const { user, username, userdata } = useContext(AuthContext);
  return (
    <div className="mt-12">
      <div className="flex items-center flex-col">
        <div className="relative flex-shrink-0 w-28 h-28 mb-3 rounded-full overflow-hidden">
          <Image
            src={user?.photoURL || "/img/avatar.svg"}
            width="112"
            height="112"
            objectFit="cover"
          />
        </div>
        <div className="">
          <div>
            <p className="text-2xl md:text-3xl">
              {user?.displayName || "Anonymous"}
            </p>
            <p className="text-sm text-center text-gray-400">{user?.email}</p>
          </div>
          {/* <div className="flex mt-3">
            <p className="mr-8">
              <strong>{userdata?.totalPosts || 0}</strong> Posts
            </p>
            <p className="mr-8">
              <strong>${userdata?.totalDonation || 0}</strong> Donation
            </p>
            <p className="mr-2">
              <strong>{userdata?.totalNotification || 0}</strong> Notification
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
