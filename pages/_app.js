import { AuthContext } from "@lib/authContext";
import useUserData from "@lib/useUserData";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "../layouts/default";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || DefaultLayout;
  const userData = useUserData();
  return (
    <AuthContext.Provider value={userData}>
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
    </AuthContext.Provider>
  );
}

export default MyApp;
