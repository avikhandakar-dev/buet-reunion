import ActiveLink from "@components/ActiveLink";
import Container from "@components/Container";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import ProfileHeader from "@components/Profile/Header";
import { AuthContext } from "@lib/authContext";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect } from "react";
import { BsFillGrid1X2Fill, BsHeartFill } from "react-icons/bs";
import { FaUserEdit, FaPoll } from "react-icons/fa";

const ProfileLayout = ({ children }) => {
  const { user, username } = useContext(AuthContext);
  const MenuItems = [
    {
      name: "Posts",
      icon: <BsFillGrid1X2Fill />,
      url: `/${username || "accounts"}`,
    },
    {
      name: "Donation",
      icon: <BsHeartFill />,
      url: `/${username + "/donation" || "accounts"}`,
    },
    {
      name: "Poll",
      icon: <FaPoll />,
      url: `/${username + "/poll" || "accounts"}`,
    },
    {
      name: "Profile",
      icon: <FaUserEdit />,
      url: "/accounts/edit",
    },
  ];
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
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 flex justify-center">
          {MenuItems.map((item) => (
            <ActiveLink
              activeClassName="text-primary border-t border-primary"
              href={item.url}
            >
              <a className="uppercase mx-6 pt-4 text-gray-500 tracking-widest font-medium text-sm flex justify-center items-center">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </a>
            </ActiveLink>
          ))}
        </div>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ProfileLayout;
