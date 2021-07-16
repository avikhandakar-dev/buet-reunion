import Container from "@components/Container";
import Footer from "@components/Footer";
import LoadingScreen from "@components/LoadingScreen";
import Nav from "@components/Nav";
import ProfileHeader from "@components/Profile/Header";
import { auth } from "@lib/firebase";
import { GlobalContext } from "@lib/globalContext";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfileLayout = ({ children }) => {
  const [user, userIsLoading] = useAuthState(auth);
  const { userData, userDataIsLoading } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    if (!userIsLoading) {
      if (!user) {
        router.push({
          pathname: "/accounts/login",
          query: { next: router.pathname },
        });
      } else {
        if (!userDataIsLoading) {
          if (!userData?.username) {
            router.push("/accounts/edit");
          }
        }
      }
    }
  }, [user]);

  if (userIsLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="max-w-5xl">
        <ProfileHeader />
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
