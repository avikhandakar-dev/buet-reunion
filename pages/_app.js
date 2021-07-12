import { AuthContextProvider } from "@lib/authContext";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "../layouts/default";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";
import GlobalContextProvider from "@lib/globalContext";
import { Fragment } from "react";
import { DefaultSeo } from "next-seo";
import { SEO } from "next-seo.config";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || DefaultLayout;
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <AuthContextProvider>
        <GlobalContextProvider>
          <AnimatePresence initial={false} exitBeforeEnter>
            <Layout key={router.route}>
              <NextNprogress
                color="#129AFE"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </AnimatePresence>
        </GlobalContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
}

export default MyApp;
