import { useState } from "react";

const { default: MdEditorLite } = require("@components/MdEditor");

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  return (
    <div className="rounded-md shadow overflow-hidden relative">
      <div className="py-4 px-5 bg-white dark:bg-gray-700">
        <p className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Add new project
        </p>
      </div>
      <div className="py-4 px-5 bg-gray-50 dark:bg-gray-700 flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto w-full">
          <form>
            <div className="block mb-2">
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
                name="title"
                required
                type="text"
                className="block rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                placeholder="Project Title"
              />
            </div>
            <div className="block mb-2">
              <div className="flex justify-center items-center">
                <input
                  onChange={(event) => {
                    setSlug(event.target.value);
                  }}
                  value={slug}
                  name="slug"
                  required
                  type="text"
                  className="block rounded-md w-full border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700 px-2 py-2"
                  placeholder="Slug"
                />
                <a className="cursor-pointer px-5 py-2 flex-shrink-0 bg-gradient-1-start text-yellow-800 transition-colors duration-300 hover:bg-gradient-1-stop font-medium ml-4 rounded">
                  Auto Generate
                </a>
              </div>
            </div>
            <MdEditorLite />
            <button
              type="submit"
              className="px-16 py-2 font-medium mt-4 bg-primary transition-colors duration-300 hover:bg-sky outline-none focus:outline-none rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
