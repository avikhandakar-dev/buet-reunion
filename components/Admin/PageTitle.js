import Button from "@components/Button";
import Link from "next/link";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AdminPageTitle = ({ title, action }) => {
  return (
    <div className="flex justify-between sticky -top-11 z-10 bg-adminBgLight dark:bg-gray-800 items-center py-4 mb-2">
      <span className="text-3xl lg:text-5xl uppercase text-gray-600 dark:text-gray-200 font-extralight  tracking-wide">
        <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l dark:from-yellow-400 dark:to-yellow-200 from-primary to-sky uppercase font-black text-5xl lg:text-7xl">
          {title.charAt(0)}
        </span>
        {title.slice(1)}
      </span>
      {action && (
        <>
          <span className="hidden lg:block">
            <Button title={action.title} href={action.href} />
          </span>
          <Link href={action.href}>
            <a className="md:text-5xl text-4xl lg:hidden text-primary">
              <BsFillPlusCircleFill />
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminPageTitle;
