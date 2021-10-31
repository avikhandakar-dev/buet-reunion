import Collapse from "../../components/Collapse";
import Container from "../../components/Container";
import { FaCookieBite } from "react-icons/fa";
import Link from "next/link";
const Cookies = () => {
  return (
    <Container maxWidth="max-w-5xl" bgColor="mt-16">
      <div className="text-center mb-4">
        <div className="text-primary justify-center items-center flex text-7xl">
          <FaCookieBite />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Cookie Policy
        </h1>
        <p className="text-xl dark:text-gray-300 font-medium text-gray-700">
          Updated June 18, 2021
        </p>
      </div>
      <div className="mb-16 text-left md:text-center text-gray-700 dark:text-gray-400 mx-auto max-w-2xl text-lg">
        <p className="mb-2 text-body">
          This Cookie Policy explains how BUETIAN 89 NA (“
          <em className="font-semibold">Company</em>", “
          <em className="font-semibold">we</em>", “
          <em className="font-semibold">us</em>",“
          <em className="font-semibold">our</em>") uses cookies and similar
          technologies to recognize you when you visit our websites at{" "}
          <a className="italic transition-colors text-primary hover:text-secondary">
            https://buetian89na.org
          </a>
          . It explains what these technologies are and why we use them, as well
          as your rights to control our use of them.
        </p>
      </div>
      <Collapse title="What Are Cookies">
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites
        functionality.
      </Collapse>
      <Collapse title="How We Use Cookies">
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </Collapse>
      <Collapse title="Disabling Cookies">
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </Collapse>
      <Collapse title="The Cookies We Set">
        <ul className="list-disc pl-10">
          <li>
            <p className="mb-3">
              <strong>Account related cookies</strong>
            </p>
            <p className="mb-3">
              If you create an account with us then we will use cookies for the
              management of the signup process and general administration. These
              cookies will usually be deleted when you log out however in some
              cases they may remain afterwards to remember your site preferences
              when logged out.
            </p>
          </li>
          <li>
            <p className="mb-3">
              <strong>Login related cookies</strong>
            </p>
            <p>
              We use cookies when you are logged in so that we can remember this
              fact. This prevents you from having to log in every single time
              you visit a new page. These cookies are typically removed or
              cleared when you log out to ensure that you can only access
              restricted features and areas when logged in.
            </p>
          </li>
        </ul>
      </Collapse>
      <Collapse title="Third Party Cookies">
        <p className="mb-3">
          In some special cases we also use cookies provided by trusted third
          parties. The following section details which third party cookies you
          might encounter through this site.
        </p>
        <ul className="list-disc pl-10">
          <li>
            <p className="mb-3">
              This site uses Google Analytics which is one of the most
              widespread and trusted analytics solution on the web for helping
              us to understand how you use the site and ways that we can improve
              your experience. These cookies may track things such as how long
              you spend on the site and the pages that you visit so we can
              continue to produce engaging content.
            </p>
            <p>
              For more information on Google Analytics cookies, see the official
              Google Analytics page.
            </p>
          </li>
        </ul>
      </Collapse>
      <Collapse title="More Information">
        <p className="mb-3">
          Hopefully that has clarified things for you and as was previously
          mentioned if there is something that you aren't sure whether you need
          or not it's usually safer to leave cookies enabled in case it does
          interact with one of the features you use on our site.
        </p>
        <p className="mb-3">
          For more general information on cookies, please read{" "}
          <a
            className="text-primary hover:text-sky"
            target="_blank"
            href="https://www.privacypolicyonline.com/what-are-cookies/"
          >
            "What Are Cookies"
          </a>
          .
        </p>
        <p>
          However if you are still looking for more information then you can{" "}
          <Link href="/contact">
            <a className="text-primary hover:text-sky">contact us</a>
          </Link>
        </p>
      </Collapse>
    </Container>
  );
};

export default Cookies;
