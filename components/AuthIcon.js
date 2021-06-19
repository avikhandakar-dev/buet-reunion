import Link from "next/link";
import { MdLockOpen } from "react-icons/md";
import { AuthContext } from "@lib/authContext";
import Image from "next/image";
import { useContext } from "react";

const AuthIcon = () => {
  const { user, username, userdata } = useContext(AuthContext);
  return user ? (
    <span
      style={{ width: 45, height: 45 }}
      className="mr-5 border-2 border-gray-200 dark:border-gray-600 relative rounded-full overflow-hidden"
    >
      <Link href={username ? `/${username}` : "/accounts"}>
        <a>
          <Image
            src={user.photoURL || "/img/avatar.svg"}
            width={45}
            height={45}
            objectFit="cover"
          />
        </a>
      </Link>
    </span>
  ) : (
    <span className="mr-5">
      <Link href="/accounts/login">
        <a className="transition duration-200 hover:text-primary flex justify-center items-center">
          <span className="mr-2">
            <MdLockOpen />
          </span>{" "}
          Login
        </a>
      </Link>
    </span>
  );
};

export default AuthIcon;
