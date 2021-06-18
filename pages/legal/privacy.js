import Collapse from "../../components/Collapse";
import Container from "../../components/Container";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import Link from "next/link";

const Privacy = () => {
  return (
    <Container maxWidth="5xl" bgColor="mt-16">
      <div className="text-center mb-4">
        <div className="text-primary justify-center items-center flex text-7xl">
          <IoShieldCheckmarkSharp />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Privacy Policy
        </h1>
        <p className="text-xl dark:text-gray-300 font-medium text-gray-700">
          Updated June 18, 2021
        </p>
      </div>
      <div className="mb-16 text-left md:text-center text-gray-700 dark:text-gray-400 mx-auto max-w-2xl text-lg">
        <p className="mb-3 text-body">
          At BUETIAN 89, accessible from buet.com, one of our main priorities is
          the privacy of our visitors. This Privacy Policy document contains
          types of information that is collected and recorded by BUETIAN 89 and
          how we use it.
        </p>
        <p className="mb-3">
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>
        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in BUETIAN 89. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>
      </div>
      <Collapse title="Consent">
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </Collapse>
      <Collapse title="Information we collect">
        <p className="mb-3">
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>
        <p className="mb-3">
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <p>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>
      </Collapse>
      <Collapse title="How we use your information">
        <p className="mb-3">
          <strong>
            We use the information we collect in various ways, including to:
          </strong>
        </p>
        <ul className="list-disc pl-10">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>
      </Collapse>
      <Collapse title="Log Files">
        <p>
          BUETIAN 89 follows a standard procedure of using log files. These
          files log visitors when they visit websites. All hosting companies do
          this and a part of hosting services' analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic
          information.
        </p>
      </Collapse>
      <Collapse title="Cookies and Web Beacons">
        <p className="mb-3">
          Like any other website, BUET89 uses 'cookies'. These cookies are used
          to store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page
          content based on visitors' browser type and/or other information.
        </p>
        <p>
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
      </Collapse>
      <Collapse title="Advertising Partners Privacy Policies">
        <p className="mb-3">
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of BUETIAN 89.
        </p>
        <p className="mb-3">
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on BUET89, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>
        <p>
          Note that BUET89 has no access to or control over these cookies that
          are used by third-party advertisers.
        </p>
      </Collapse>
      <Collapse title="Third Party Privacy Policies">
        <p className="mb-3">
          BUET89's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </p>
      </Collapse>
      <Collapse title="CCPA Privacy Rights">
        <p className="mb-3">
          <strong>
            Under the CCPA, among other rights, California consumers have the
            right to:
          </strong>
        </p>
        <p className="mb-3">
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
        </p>
        <p className="mb-3">
          Request that a business delete any personal data about the consumer
          that a business has collected.
        </p>
        <p className="mb-3">
          Request that a business that sells a consumer's personal data, not
          sell the consumer's personal data.
        </p>
        <p>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </p>
      </Collapse>
      <Collapse title="GDPR Data Protection Rights">
        <p className="mb-3">
          <strong>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </strong>
        </p>
        <p className="mb-3">
          The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
        </p>
        <p className="mb-3">
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
        </p>
        <p className="mb-3">
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </p>
        <p className="mb-3">
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.
        </p>
        <p className="mb-3">
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        </p>
        <p className="mb-3">
          The right to data portability – You have the right to request that we
          transfer the data that we have collected to another organization, or
          directly to you, under certain conditions.
        </p>
        <p>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please{" "}
          <Link href="/contact">
            <a className="text-primary hover:text-sky">contact us</a>
          </Link>
          .
        </p>
      </Collapse>
      <Collapse title="Children's Information">
        <p className="mb-3">
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          BUETIAN 89 does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>
      </Collapse>
    </Container>
  );
};

export default Privacy;
