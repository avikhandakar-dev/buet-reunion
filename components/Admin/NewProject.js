const { default: MdEditorLite } = require("@components/MdEditor");

const NewProject = () => {
  return (
    <div className="rounded-md shadow overflow-hidden relative max-w-7xl mx-auto">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Add new project
        </p>
      </div>
      <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 flex flex-col justify-center items-center">
        <MdEditorLite />
      </div>
    </div>
  );
};

export default NewProject;
