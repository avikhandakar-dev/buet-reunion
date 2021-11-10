import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const rowsPerPage = [5, 10, 15, 25, 50];
const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  totalItems,
  paginateFront,
  paginateBack,
  paginateFirst,
  paginateLast,
  currentPage,
  totalPage,
}) => {
  const fromIndex = () => {
    const index = currentPage * itemsPerPage - itemsPerPage;
    if (index >= totalItems) {
      return (currentPage - 1) * itemsPerPage;
    } else {
      return index;
    }
  };
  const toIndex = () => {
    const index = currentPage * itemsPerPage;
    if (index >= totalItems) {
      return totalItems;
    } else {
      return index;
    }
  };
  return (
    <div className="py-2 px-4 flex justify-between items-center bg-gray-50 dark:bg-gray-600">
      <div className="hidden lg:block">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-medium">{fromIndex()} </span>
          to <span className="font-medium"> {toIndex()} </span>
          of <span className="font-medium"> {totalItems} </span>
          results
        </p>
      </div>
      <div>
        <div
          className="relative z-0 inline-flex -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => {
              paginateFirst();
            }}
            className={`${
              currentPage == 1
                ? "text-gray-500 dark:text-gray-300 opacity-30 cursor-default"
                : "text-green-500 dark:text-green-300"
            } relative text-2xl inline-flex items-center px-2 py-2`}
          >
            <span>
              <CgPushChevronLeft />
            </span>
          </button>
          <button
            onClick={() => {
              paginateBack();
            }}
            className={`${
              currentPage <= 1
                ? "text-gray-500 dark:text-gray-300 opacity-30 cursor-default"
                : "text-green-500 dark:text-green-300"
            } relative text-lg inline-flex items-center px-2 py-2`}
          >
            <span>
              <FaChevronLeft />
            </span>
          </button>

          <select
            className="block invalid:text-gray-500 bg-transparent border-none focus:border-none active:border-none focus:ring-0 pr-8 text-sm"
            required
            name="rows"
            onChange={(event) => {
              setItemsPerPage(event.target.value);
            }}
          >
            {rowsPerPage.map((item) => (
              <option selected={item == itemsPerPage} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              paginateFront();
            }}
            className={`${
              currentPage >= totalPage
                ? "text-gray-500 dark:text-gray-300 opacity-30 cursor-default"
                : "text-green-500 dark:text-green-300"
            } relative text-lg inline-flex items-center px-2 py-2`}
          >
            <span>
              <FaChevronRight />
            </span>
          </button>
          <button
            onClick={() => {
              paginateLast();
            }}
            className={`${
              currentPage == totalPage
                ? "text-gray-500 dark:text-gray-300 opacity-30 cursor-default"
                : "text-green-500 dark:text-green-300"
            } relative text-2xl inline-flex items-center px-2 py-2`}
          >
            <span>
              <CgPushChevronRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
