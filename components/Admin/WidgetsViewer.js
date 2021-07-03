import BlogPostsWidget from "@components/Widgets/BlogPosts";
import DonationsWidget from "@components/Widgets/Donations";
import PollsWidget from "@components/Widgets/Polls";

const { default: TotalUsersWidget } = require("@components/Widgets/TotalUsers");

const WidgetsViewerAdmin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      <TotalUsersWidget />
      <DonationsWidget />
      <BlogPostsWidget />
      <PollsWidget />
    </div>
  );
};

export default WidgetsViewerAdmin;
