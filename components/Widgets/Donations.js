import { useState } from "react";
import AuthContext from "@lib/authContext";
import { AiFillHeart } from "react-icons/ai";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";

const DonationsWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [donations = [], loading, error] = useDocumentData(
    firestore.collection("aggregations").doc("donations")
  );
  return (
    <div className="w-full shadow-md relative px-5 py-3 rounded-md bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="uppercase text-gray-400 dark:text-gray-200 text-sm">
            Donations
          </p>
          <p className="text-black dark:text-white text-2xl">
            ${donations.total || 0}
          </p>
        </div>
        <div className="text-white w-10 h-10 text-xl flex justify-center items-center bg-pink-500 rounded-full">
          <AiFillHeart />
        </div>
      </div>
      <div className="flex">
        <p className="text-gray-400 dark:text-gray-200 mr-3">
          Top donor <span className="text-green-400 italic">null</span>
        </p>
      </div>
    </div>
  );
};

export default DonationsWidget;
