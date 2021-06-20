const { default: Button } = require("@components/Button");

const AdminPageTitle = ({ title, action }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-2xl lg:text-2xl uppercase text-gray-600 dark:text-gray-200 font-medium tracking-wider">
        <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l dark:from-yellow-400 dark:to-yellow-200 from-primary to-sky uppercase font-black text-7xl">
          {title.charAt(0)}
        </span>
        {title.slice(1)}
      </span>
      <Button title={action.title} href={action.href} />
    </div>
  );
};

export default AdminPageTitle;
