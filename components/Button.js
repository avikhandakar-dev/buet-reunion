import Link from "next/link";

const Button = ({ title, href, color = "primary", size = "medium" }) => {
  const padding = size == "medium" ? "py-2 px-6" : "py-3 px-6";
  const btnColor = () => {
    if (color == "primary") {
      return "bg-primary hover:bg-sky text-white";
    }
    if (color == "black") {
      return "bg-gray-700 hover:bg-gray-800 text-white";
    }
  };
  return (
    <Link href={href}>
      <a
        className={`inline-flex items-center justify-center ${padding} font-medium tracking-wide transition duration-200 rounded shadow-md ${btnColor()} focus:shadow-outline focus:outline-none`}
      >
        {title}
      </a>
    </Link>
  );
};

export default Button;
