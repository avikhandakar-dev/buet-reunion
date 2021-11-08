import Container from "@components/Container";
import { AiFillLock } from "react-icons/ai";
import BillingAddress from "./Address";
import DonationAmount from "./Amount";
import SelectProject from "./SelectProject";
import { SiAmericanexpress, SiVisa } from "react-icons/si";
import { FaCcDiscover, FaCcMastercard } from "react-icons/fa";
import { RiPaypalFill } from "react-icons/ri";
import { useContext, useState } from "react";
import getStripe from "@lib/getStripe";
import { fetchPostJSON } from "@lib/healper";
import toast from "react-hot-toast";
import { GlobalContext } from "@lib/globalContext";

const DonationForm = () => {
  const { user } = useContext(GlobalContext);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const PAYPAL_CHECKOUT = () => {};
  const STRIPE_CHECKOUT = async () => {
    setIsLoading(true);
    const response = await fetchPostJSON("/api/payment/stripe/sessions", {
      amount,
      project,
      address,
    });
    if (response.statusCode === 500) {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }
    const stripe = await getStripe();
    const { error } = await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
    console.warn(error.message);
    setIsLoading(false);
  };
  return (
    <Container maxWidth="max-w-6xl -mt-16 lg:-mt-8">
      <div className="h-full w-full dark:border-2 dark:border-gray-900 px-6 py-8 md:px-16 md:py-16 dark:py-0 shadow-projectBar rounded-2xl">
        <SelectProject project={(pro) => setProject(pro)} />
        <DonationAmount totalAmount={(amount) => setAmount(amount)} />
        <BillingAddress address={(addr) => setAddress(addr)} />
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <h1 className="font-bold font-serif lg:text-xl text-gray-600 dark:text-gray-300">
              Payment
            </h1>
            <p className="flex text-gray-500 dark:text-gray-400 justify-center items-center uppercase font-light text-sm">
              (
              <span className="mr-1">
                <AiFillLock />
              </span>
              <span className="text-xs">Secure</span>)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-3xl">
            <button
              disabled={isLoading}
              onClick={STRIPE_CHECKOUT}
              className={`cursor-pointer rounded text-4xl flex text-white justify-center items-center space-x-4 w-full px-4 py-1 bg-violet hover:bg-darkBlue duration-300 ${
                isLoading && "opacity-50 cursor-not-allowed saturate-0"
              }`}
            >
              <FaCcDiscover />
              <FaCcMastercard />
              <SiVisa />
            </button>
            <a className="cursor-pointer rounded text-4xl flex text-white justify-center items-center space-x-2 w-full px-4 py-1 bg-sky hover:bg-primary duration-300">
              <RiPaypalFill />
              <p className="italic font-bold text-lg">
                PayPal <span className="text-xs italic">(Comming soon)</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonationForm;
