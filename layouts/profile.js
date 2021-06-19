import ActiveLink from "@components/ActiveLink";
import Container from "@components/Container";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import ProfileHeader from "@components/Profile/Header";
import { AuthContext } from "@lib/authContext";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";

const ProfileLayout = ({ children }) => {
  const { user, username } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/accounts/login",
        query: { next: router.pathname },
      });
    } else {
      if (!username) {
        router.push("/accounts/edit");
      }
    }
  }, [user]);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="5xl">
        <ProfileHeader />
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
