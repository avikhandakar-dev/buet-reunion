import PulseBar from "@components/Pulse/Bar";
import AuthContext from "@lib/authContext";
import ProfileLayout from "layouts/profile";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

const UsersDonation = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState(null);
  useEffect(() => {
    const unsubs = async () => {
      const token = await user?.getIdToken();
      console.log(token);
      const res = await fetch("/api/users/donation", {
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
        setDonations(data);
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
  if (!donations || donations.length < 1) {
    return (
      <div className="w-full text-center h-80 flex justify-center items-center flex-col">
        <img src="/img/no-posts.svg" className="mb-3" />
        <div className="text-center text-xl text-gray-400 font-light capitalize">
          No posts found
        </div>
        <div className="text-center mt-5">
          <Link href="/">
            <a className="uppercase tracking-widest transition-colors duration-300 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white px-10 py-3 border border-black dark:border-white">
              Donate Now
            </a>
          </Link>
        </div>
      </div>
    );
  }
  return <p>Donations</p>;
};

UsersDonation.layout = ProfileLayout;
export default UsersDonation;
