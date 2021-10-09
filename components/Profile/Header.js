import Image from "next/image";

const ProfileHeader = ({ userData }) => {
  return (
    <div className="z-0 h-[500px] w-full relative">
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 z-10" />
      <div className="relative w-full h-full">
        <Image
          placeholder="blur"
          blurDataURL={`/img/cover/${
            userData.coverPhoto || "cover-default"
          }-loader.jpg`}
          src={`/img/cover/${userData.coverPhoto || "cover-default"}.jpg`}
          priority={true}
          objectFit="cover"
          layout="fill"
          sizes="(max-width: 640px) 512px, (max-width: 1024px) 1024px, 1600px"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
