const { default: TotalUsersWidget } = require("@components/Widgets/TotalUsers");

const WidgetsViewerAdmin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      <TotalUsersWidget />
      <TotalUsersWidget />
      <TotalUsersWidget />
      <TotalUsersWidget />
    </div>
  );
};

export default WidgetsViewerAdmin;
