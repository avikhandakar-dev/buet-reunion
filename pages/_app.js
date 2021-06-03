import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "../layouts/default";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || DefaultLayout;
  return (
    <Fragment>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Layout key={router.route}>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </AnimatePresence>
    </Fragment>
  );
}

export default MyApp;
