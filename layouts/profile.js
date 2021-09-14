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
      <Nav />
      <ProfileHeader userData={userData} />
      <div className="max-w-5xl px-4 sm:px-6 relative mx-auto">
        <div className="flex space-x-16">
          <div className="-mt-20 max-w-sm relative flex-shrink-0 w-72">
            <ProfileInfo userData={userData} />
          </div>
          <div className="flex-1 flex-grow">
            <div className="flex justify-center">
              <ProfileNav />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
