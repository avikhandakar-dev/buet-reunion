import FooterLarge from "./FooterLarge";
import FooterSmall from "./FooterSmall";

const Footer = ({ variant }) => {
  const footer = () => {
    if (variant == "small") {
      return <FooterSmall />;
    } else {
      return <FooterLarge />;
    }
  };
  return footer();
};

export default Footer;
