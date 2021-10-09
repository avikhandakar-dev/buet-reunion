import PollsTable from "@components/Poll/PollsTable";
import PulseBar from "@components/Pulse/Bar";
import Empty from "@components/Svg/Empty";
import AuthContext from "@lib/authContext";
import ProfileLayout from "layouts/profile";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

const UsersPoll = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    const unsubs = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("/api/users/get-polls", {
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const { error, data } = await res.json();
      if (!error) {
        setPolls(data);
      }
      setIsLoading(false);
    };
    return unsubs();
  }, []);
  if (isLoading) {
    return (
      <div className="mt-10">
        <PulseBar count={3} />
      </div>
    );
  }
  if (!polls || polls.length < 1) {
    return (
      <div className="w-full text-center h-80 flex justify-center items-center flex-col">
        <Empty className="w-40" />

        <div className="text-center mt-5">
          <Link href="/donate">
            <a className="uppercase tracking-widest transition-colors duration-300 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white px-10 py-3 border border-black dark:border-white">
              Donate Now
            </a>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PollsTable noTitle transparentBody polls={polls} />
    </div>
  );
};

UsersPoll.layout = ProfileLayout;
export default UsersPoll;
