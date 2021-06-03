import { Fragment } from "react";
import About from "../components/Home/About";
import Hero from "../components/Home/Hero";
import RecentBlog from "../components/Home/RecentBlog";
import RecentProjects from "../components/Home/RecentProjects";

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <About />
      <RecentProjects />
      <RecentBlog />
    </Fragment>
  );
};

export default HomePage;
