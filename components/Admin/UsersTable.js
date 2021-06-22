import Avatar from "@components/Avatar";

const UsersTable = ({ users, category }) => {
  return (
    <>
      {users.length > 0 && (
        <div className="border border-gray-300 rounded-md dark:border-gray-600 p-5">
          <div className="mb-3 px-5">
            <p className="font-medium text-xl">
              {category} - {users.length}
            </p>
          </div>
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white mb-2 rounded-md dark:bg-gray-700 p-5 shadow grid grid-cols-3 align-middle"
            >
              <div className="flex items-center mr-10 w-64">
                <Avatar user={user} />
                <span className="ml-4">{user.displayName}</span>
              </div>
              <span className="mr-10 pt-2">{user.email}</span>
              <span className="pt-2">{user.metadata.creationTime}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersTable;
