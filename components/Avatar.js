import Image from "next/image";

const Avatar = ({ user, size = 10, textSize = "xl", extraClasses }) => {
  return (
    <div className="border-0 border-gray-300 dark:border-gray-200 inline-block rounded-full mx-1 md:mx-0">
      <div
        className={`relative w-${size} h-${size} rounded-full overflow-hidden ${
          extraClasses ? extraClasses : null
        }`}
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            layout="fill"
            objectFit="cover"
            alt="Avatar"
          />
        ) : (
          <span className="w-full h-full flex justify-center items-center text-bold rounded-full border border-admin_lighter text-gray-700 text-lg">
            <p className={`font-bold uppercase text-${textSize}`}>
              {user.displayName?.substring(0, 2)}
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;