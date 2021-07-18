import Container from "@components/Container";
import DonationForm from "@components/Donate/Form";
import DonateHeader from "@components/Donate/Header";
import { firestore } from "@lib/firebase";
import { Fragment, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DonatePage = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  const [customAmount, setCustomAmount] = useState(null);
  return (
    <Fragment>
      <DonateHeader />
      <div className="pt-8" id="donation">
        <DonationForm />
      </div>
    </Fragment>
  );
};

export default DonatePage;
