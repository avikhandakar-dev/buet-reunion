import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "../layouts/default";
import { AuthContextProvider } from "../lib/authContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || DefaultLayout;
  return (
    <AuthContextProvider>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Layout key={router.route}>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </AnimatePresence>
    </AuthContextProvider>
  );
}

export default MyApp;
