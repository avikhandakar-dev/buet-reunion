import React, { Fragment } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const DefaultLayout = ({ children }) => {
  return (
    <Fragment>
      <Nav />
      {children}
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
