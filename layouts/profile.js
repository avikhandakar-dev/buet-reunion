import Container from "@components/Container";
import Footer from "@components/Footer";
import LoadingScreen from "@components/LoadingScreen";
import Nav from "@components/Nav";
import ProfileHeader from "@components/Profile/Header";
import ProfileInfo from "@components/Profile/Info";
import ProfileNav from "@components/Profile/Nav";
import { auth } from "@lib/firebase";
import { GlobalContext } from "@lib/globalContext";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfileLayout = ({ children }) => {
  const [user, userIsLoading] = useAuthState(auth);
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(async () => {
    if (!userIsLoading) {
      if (!user) {
        router.push({
          pathname: "/accounts/login",
          query: { next: "/profile" },
        });
      }
    }
  }, [userIsLoading]);

  if (userIsLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <Fragment>
      <ProfileNav />
      <div className="dark:bg-gradient-dark-1-start bg-gray-50">
        <ProfileHeader userData={userData} />
        <div className="w-full px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className=" min-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-card -mt-64 px-6">
              <ProfileInfo userData={userData} />

              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
