import Collapse from "../../components/Collapse";
import Container from "../../components/Container";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";

const Terms = () => {
  return (
    <Container maxWidth="max-w-5xl" bgColor="mt-16">
      <div className="text-center mb-4">
        <div className="text-primary justify-center items-center flex text-7xl">
          <FaBookOpen />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Terms of Use
        </h1>
        <p className="text-xl dark:text-gray-300 font-medium text-gray-700">
          Updated June 18, 2021
        </p>
      </div>
      <div className="mb-16 text-left md:text-center text-gray-700 dark:text-gray-400 mx-auto max-w-2xl text-lg">
        <p className="mb-3">
          These terms and conditions outline the rules and regulations for the
          use of BUETIAN 89's Website, located at buetian89.com.
        </p>
        <p className="mb-3">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use BUETIAN 89 if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>
      </div>
      <Collapse title="Introduction">
        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Netherlands. Any use
          of the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
      </Collapse>
      <Collapse title="Cookies">
        <p className="mb-3">
          We employ the use of cookies. By accessing BUETIAN 89, you agreed to
          use cookies in agreement with the BUETIAN 89's Privacy Policy.
        </p>
        <p>
          Most interactive websites use cookies to let us retrieve the user’s
          details for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>
      </Collapse>
      <Collapse title="License">
        <p className="mb-3">
          Unless otherwise stated, BUETIAN 89 and/or its licensors own the
          intellectual property rights for all material on BUETIAN 89. All
          intellectual property rights are reserved. You may access this from
          BUETIAN 89 for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>
        <p className="mb-3">
          <strong>You must not:</strong>
        </p>
        <ul className="list-disc pl-10 mb-3">
          <li>Republish material from BUETIAN 89</li>
          <li>Sell, rent or sub-license material from BUETIAN 89</li>
          <li>Reproduce, duplicate or copy material from BUETIAN 89</li>
          <li>Redistribute content from BUETIAN 89</li>
        </ul>
        <p className="mb-3">
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          BUETIAN 89 does not filter, edit, publish or review Comments prior to
          their presence on the website. Comments do not reflect the views and
          opinions of BUETIAN 89,its agents and/or affiliates. Comments reflect
          the views and opinions of the person who post their views and
          opinions. To the extent permitted by applicable laws, BUETIAN 89 shall
          not be liable for the Comments or for any liability, damages or
          expenses caused and/or suffered as a result of any use of and/or
          posting of and/or appearance of the Comments on this website.
        </p>
        <p className="mb-3">
          BUETIAN 89 reserves the right to monitor all Comments and to remove
          any Comments which can be considered inappropriate, offensive or
          causes breach of these Terms and Conditions.
        </p>
        <p className="mb-3">
          <strong>You warrant and represent that:</strong>
        </p>
        <ul className="list-disc mb-3 pl-10">
          <li>
            You are entitled to post the Comments on our website and have all
            necessary licenses and consents to do so;
          </li>
          <li>
            The Comments do not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any
            third party;
          </li>
          <li>
            The Comments do not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of
            privacy
          </li>
          <li>
            The Comments will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </ul>
        <p>
          You hereby grant BUETIAN 89 a non-exclusive license to use, reproduce,
          edit and authorize others to use, reproduce and edit any of your
          Comments in any and all forms, formats or media.
        </p>
      </Collapse>
      <Collapse title="Hyperlinking to our Content">
        <p className="mb-3">
          <strong>
            The following organizations may link to our Website without prior
            written approval:
          </strong>
        </p>
        <ul className="list-disc pl-10 mb-3">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>
            Online directory distributors may link to our Website in the same
            manner as they hyperlink to the Websites of other listed businesses;
            and
          </li>
          <li>
            System wide Accredited Businesses except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups which may not hyperlink to our Web site.
          </li>
        </ul>
        <p className="mb-3">
          These organizations may link to our home page, to publications or to
          other Website information so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement or
          approval of the linking party and its products and/or services; and
          (c) fits within the context of the linking party’s site.
        </p>
        <p className="mb-3">
          <strong>
            We may consider and approve other link requests from the following
            types of organizations:
          </strong>
        </p>
        <ul className="mb-3 list-disc pl-10">
          <li>commonly-known consumer and/or business information sources;</li>
          <li>dot.com community sites;</li>
          <li>associations or other groups representing charities;</li>
          <li>online directory distributors;</li>
          <li>internet portals;</li>
          <li>accounting, law and consulting firms; and</li>
          <li>educational institutions and trade associations.</li>
        </ul>
        <p className="mb-3">
          We will approve link requests from these organizations if we decide
          that: (a) the link would not make us look unfavorably to ourselves or
          to our accredited businesses; (b) the organization does not have any
          negative records with us; (c) the benefit to us from the visibility of
          the hyperlink compensates the absence of BUETIAN 89; and (d) the link
          is in the context of general resource information.
        </p>
        <p className="mb-3">
          These organizations may link to our home page so long as the link: (a)
          is not in any way deceptive; (b) does not falsely imply sponsorship,
          endorsement or approval of the linking party and its products or
          services; and (c) fits within the context of the linking party’s site.
        </p>
        <p className="mb-3">
          If you are one of the organizations listed in paragraph 2 above and
          are interested in linking to our website, you must inform us by
          sending an e-mail to BUETIAN 89. Please include your name, your
          organization name, contact information as well as the URL of your
          site, a list of any URLs from which you intend to link to our Website,
          and a list of the URLs on our site to which you would like to link.
          Wait 2-3 weeks for a response.
        </p>
        <p className="mb-3">
          <strong>
            Approved organizations may hyperlink to our Website as follows:
          </strong>
        </p>
        <ul className="mb-3 pl-10 list-disc">
          <li>By use of our corporate name; or</li>
          <li>By use of the uniform resource locator being linked to; or</li>
          <li>
            By use of any other description of our Website being linked to that
            makes sense within the context and format of content on the linking
            party’s site.
          </li>
        </ul>
        <p>
          No use of BUETIAN 89's logo or other artwork will be allowed for
          linking absent a trademark license agreement.
        </p>
      </Collapse>
      <Collapse title="iFrames">
        <p>
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter in any way the visual
          presentation or appearance of our Website.
        </p>
      </Collapse>
      <Collapse title="Content Liability">
        <p>
          We shall not be hold responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that is
          rising on your Website. No link(s) should appear on any Website that
          may be interpreted as libelous, obscene or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third party rights.
        </p>
      </Collapse>
      <Collapse title="Your Privacy">
        Please read{" "}
        <Link href="/legal/privacy">
          <a className="text-primary hover:text-sky">Privacy Policy</a>
        </Link>
      </Collapse>
      <Collapse title="Reservation of Rights">
        <p>
          We reserve the right to request that you remove all links or any
          particular link to our Website. You approve to immediately remove all
          links to our Website upon request. We also reserve the right to amen
          these terms and conditions and it’s linking policy at any time. By
          continuously linking to our Website, you agree to be bound to and
          follow these linking terms and conditions.
        </p>
      </Collapse>
      <Collapse title="Removal of links from our website">
        <p className="mb-3">
          If you find any link on our Website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly.
        </p>
        <p>
          We do not ensure that the information on this website is correct, we
          do not warrant its completeness or accuracy; nor do we promise to
          ensure that the website remains available or that the material on the
          website is kept up to date.
        </p>
      </Collapse>
      <Collapse title="Disclaimer">
        <p className="mb-3">
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="mb-3 list-disc pl-10">
          <li>
            limit or exclude our or your liability for death or personal injury;
          </li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
        <p className="mb-3">
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>
      </Collapse>
    </Container>
  );
};

export default Terms;
