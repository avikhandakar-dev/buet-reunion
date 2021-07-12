const { FaTwitter, FaFacebook, FaLinkedin } = require("react-icons/fa");

const Share = ({ url, title, author }) => {
  const BASE_URL = "https://buet-reunion.vercel.app";
  return (
    <div className="absolute hidden lg:block top-0 -left-12 w-max h-full transform -translate-x-1/2">
      <div className="sticky top-32 flex flex-col space-y-3 pt-1">
        <a
          className="!text-gray-600 dark:!text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-8 h-8 justify-center items-center flex text-center"
          target="_blank"
          href={encodeURI(
            `https://twitter.com/share?url=${BASE_URL}${url}&text=Read "${title}" by ${author}`
          )}
        >
          <FaTwitter />
        </a>
        <a
          className="!text-gray-700 dark:!text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-8 h-8 justify-center items-center flex text-center"
          target="_blank"
          href={encodeURI(
            `https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}${url}&quote=Read "${title}" by ${author}`
          )}
        >
          <FaFacebook />
        </a>
        <a
          className="!text-gray-700 dark:!text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-8 h-8 justify-center items-center flex text-center"
          target="_blank"
          href={encodeURI(
            `https://www.linkedin.com/shareArticle?mini=true&url=${BASE_URL}${url}`
          )}
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Share;
