import Container from "@components/Container";
import LoadingScreen from "@components/LoadingScreen";
import { fetchPostJSON } from "@lib/healper";
import { useEffect, useState } from "react";
import { BiSortDown } from "react-icons/bi";
import AccessDenied from "@components/AccessDenied";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MembersTable from "@components/MembersTable";
import Pagination from "@components/Pagination";

const MembersArea = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, userIsLoading] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("asc");

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const totalItems = (filteredMembers || members).length;
  const totalPage = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (filteredMembers || members).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginateFront = () =>
    setCurrentPage(currentPage >= totalPage ? totalPage : currentPage + 1);
  const paginateBack = () =>
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  const paginateFirst = () => setCurrentPage(1);
  const paginateLast = () => setCurrentPage(totalPage);

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
        <div className="">
          <MembersTable members={currentItems} />
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={members.length}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          paginateFirst={paginateFirst}
          paginateLast={paginateLast}
          currentPage={currentPage}
          totalPage={totalPage}
          setItemsPerPage={(num) => setItemsPerPage(num)}
        />

        {/* {itemsPerPage < totalItems && (
          <div className="flex justify-center items-center mt-16">
            <button
              onClick={() => loadMore()}
              className="text-primary font-semibold border-2 border-primary px-16 py-2 w-max mx-auto rounded duration-300 hover:bg-primary hover:text-white"
            >
              Load More
            </button>
          </div>
        )} */}
      </div>
    </Container>
  );
};

export default MembersArea;
