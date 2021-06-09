import { Fragment } from "react";
import About from "../components/Home/About";
import Featured from "../components/Home/Featured";
import Hero from "../components/Home/Hero";
import RecentBlog from "../components/Home/RecentBlog";
import RecentProjects from "../components/Home/RecentProjects";

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <About />
      {/* <RecentProjects /> */}
      <Featured />
      <RecentBlog />
    </Fragment>
  );
};

export default HomePage;
