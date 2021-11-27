import Container from "@components/Container";
import LoadingScreen from "@components/LoadingScreen";
import AuthContext from "@lib/authContext";
import { fetchPostJSON, sleep } from "@lib/healper";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiFilter, BiSortDown } from "react-icons/bi";
import Image from "next/image";
import { FaGlobeAmericas, FaUserCircle } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { MdSchool } from "react-icons/md";
import MemberCard from "@components/MemberCard";
import AccessDenied from "@components/AccessDenied";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MembersArea = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, userIsLoading] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalShow, setIsModalShow] = useState(true);

  const orderBy = (data, direction) => {
    if (direction === "asc") {
      if (sortBy.includes("date")) {
        return [...data].sort((a, b) =>
          toTimestamp(a.authData.metadata.creationTime) >
          toTimestamp(b.authData.metadata.creationTime)
            ? 1
            : -1
        );
      } else {
        return [...data].sort((a, b) =>
          a.authData.displayName.toLowerCase() >
          b.authData.displayName.toLowerCase()
            ? 1
            : -1
        );
      }
    }
    if (direction === "desc") {
      if (sortBy.includes("date")) {
        return [...data].sort((a, b) =>
          toTimestamp(a.authData.metadata.creationTime) >
          toTimestamp(b.authData.metadata.creationTime)
            ? -1
            : 1
        );
      } else {
        return [...data].sort((a, b) =>
          a.authData.displayName.toLowerCase() >
          b.authData.displayName.toLowerCase()
            ? -1
            : 1
        );
      }
    }
    return data;
  };

  const orderedMembers = orderBy(members, direction);

  const filteredMembers = orderedMembers.filter((member) => {
    if (
      member.authData.displayName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.authData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profile?.CBB?.includes(searchTerm) ||
      member.profile?.state?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return member;
    }
  });

  const totalItems = (filteredMembers || members).length;
  const indexOfLastItem = 1 * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (filteredMembers || members).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const loadMore = () => {
    if (itemsPerPage < totalItems) {
      setItemsPerPage(itemsPerPage + 12);
    }
  };

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  useEffect(() => {
    const unsubs = async () => {
      if (sortBy.includes("desc")) {
        setDirection("desc");
      } else {
        setDirection("asc");
      }
    };
    return unsubs();
  }, [sortBy]);

  useEffect(() => {
    const unsubs = async () => {
      if (totalItems > 12) {
        if (itemsPerPage > totalItems) {
          setItemsPerPage(totalItems);
        }
      }
    };
    return unsubs();
  }, [itemsPerPage]);

  useEffect(() => {
    const unsubs = async () => {
      if (user) {
        const token = await user?.getIdToken();
        const response = await fetchPostJSON(
          "/api/users/get-members-with-data",
          {
            token: token,
          }
        );
        if (response.statusCode === 200) {
          setMembers(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        if (!userIsLoading) {
          setIsLoading(false);
        }
      }
    };
    return unsubs();
  }, [user, userIsLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!isLoading && !members.length) {
    return <AccessDenied />;
  }
  return (
    <Container maxWidth="max-w-6xl mt-16">
      <div>
        <h1 className="font-semibold text-2xl">Members</h1>
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          value={searchTerm}
          type="search"
          name="search"
          className="mt-3 max-w-xs bg-transparent block w-full px-0.5 border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-primary"
          placeholder="Search..."
        />
      </div>
      <div className="flex justify-end items-center space-x-6 mt-8">
        {/* <button className="font-semibold text-sm flex items-center">
          Filters
          <span>
            <BiFilter className="block text-xl ml-2" />
          </span>
        </button> */}
        <button className="font-semibold text-sm flex items-center">
          Sort By
          <span>
            <BiSortDown className="block text-xl ml-2" />
          </span>
          <select
            onChange={(event) => setSortBy(event.target.value)}
            className="focus:outline-none focus:border-none active:border-none focus:ring-0 bg-transparent border-none text-sm font-medium text-gray-400 dark:text-gray-500"
            name="sort"
          >
            <option value="date" selected>
              Join Date [A-Z]
            </option>
            <option value="date-desc">Join Date [Z-A]</option>
            <option value="name">Name [A-Z]</option>
            <option value="name-desc">Name [Z-A]</option>
          </select>
        </button>
      </div>
      <div className="mt-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.map((member) => (
            <div
              onClick={() => {
                setSelectedMember(member);
                setIsModalShow(true);
              }}
              className="shadow-md rounded-md overflow-hidden cursor-pointer duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative aspect-w-1 aspect-h-1 bg-gray-50 dark:bg-gray-900">
                {member.profile?.avatar ? (
                  <Image
                    placeholder="blur"
                    blurDataURL={member.profile.avatar.loaderDownloadUrl}
                    src={member.profile.avatar.oriDownloadUrl}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : member.authData.photoURL ? (
                  <Image
                    src={member.authData.photoURL}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full text-gray-400 dark:text-gray-600 dark:bg-gray-800 bg-gray-200 flex justify-center items-center text-7xl">
                    <AiFillPicture />
                  </div>
                )}
              </div>
              <div className="p-4 overflow-hidden bg-gray-50 dark:bg-gray-700">
                <p className="truncate text-sm font-medium">
                  {member.authData.displayName}
                </p>
                <div className="flex justify-between mt-2">
                  <div className="text-xs font-semibold flex items-center">
                    <FaGlobeAmericas className="mr-1" />
                    <p>{member.profile?.country || "US"}</p>
                  </div>
                  <div className="text-xs font-semibold flex items-center">
                    <MdSchool className="mr-1 text-base" />
                    <p>{member.profile?.CBB || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {itemsPerPage < totalItems && (
          <div className="flex justify-center items-center mt-16">
            <button
              onClick={() => loadMore()}
              className="text-primary font-semibold border-2 border-primary px-16 py-2 w-max mx-auto rounded duration-300 hover:bg-primary hover:text-white"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      {selectedMember && (
        <MemberCard
          member={selectedMember}
          isModalShow={isModalShow}
          close={() => setIsModalShow(false)}
        />
      )}
    </Container>
  );
};

export default MembersArea;
