import Image from "next/image";

const ProfileHeader = ({ userData }) => {
  return (
    <div className="z-0 h-[500px] w-full relative">
      <div className="absolute inset-0 w-full h-full bg-primary z-10" />
    </div>
  );
};

export default ProfileHeader;
