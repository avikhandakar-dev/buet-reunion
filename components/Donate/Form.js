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
import { fetchPostJSON, serverTimestampToString } from "@lib/healper";
import toast from "react-hot-toast";
import { GlobalContext } from "@lib/globalContext";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { CgSpinner } from "react-icons/cg";
import ThankYou from "./ThankYou";
import PaymentFailed from "./Failed";

const DonationForm = () => {
  const { user } = useContext(GlobalContext);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessCompleted, setIsProcessCompleted] = useState(false);
  const [isPaypalSuccess, setIsPaypalSuccess] = useState(false);
  const [status, setStatus] = useState("Preparing receipt...");
  const PAYPAL_CHECKOUT = async () => {
    setIsLoading(true);
    const response = await fetchPostJSON("/api/payment/paypal/create", {
      amount,
      project,
      address,
    });
    if (response.statusCode === 500) {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    return response.orderID;
  };

  const PAYPAL_ON_APPROVE = async (data) => {
    setIsLoading(true);
    const response = await fetchPostJSON("/api/payment/paypal/capture", {
      orderID: data.orderID,
      address,
      project,
    });
    if (response.statusCode === 200) {
      setIsPaypalSuccess(true);
      window?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const donationData = response.data;
      toast.success("Payment successful!");
      const genInvoice = await fetch("/api/generate-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donation: donationData,
          date: serverTimestampToString(donationData.createdAt),
        }),
      });
      if (genInvoice.status === 200) {
        setStatus("Sending receipt...");
        const buffer = await genInvoice.arrayBuffer();
        const blob = new Blob([buffer]);
        try {
          const base64 = await BlobToBase64(blob);
          const mailResponse = await fetchPostJSON("/api/mail/send-receipt", {
            email: donationData.donorInfo?.email,
            attachment: base64,
          });
          if (mailResponse.statusCode === 200) {
            toast.success("Donation receipt was sent to your email!");
            setIsProcessCompleted(true);
          }
        } catch (error) {
          toast.error("Can't send receipt!");
          setIsProcessCompleted(true);
        }
      } else {
        setIsProcessCompleted(true);
        toast.error("Can't send receipt!");
      }
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

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

  if (isPaypalSuccess && !isProcessCompleted)
    return (
      <>
        <div className="w-full mt-20 flex flex-col justify-center items-center h-[calc(100vh-80px)] absolute z-10 inset-0 bg-white dark:bg-black">
          <span className="text-5xl animate-spin text-primary">
            <CgSpinner />
          </span>
          <p>{status}</p>
        </div>
      </>
    );

  if (isProcessCompleted && isPaypalSuccess)
    return (
      <div className="w-full flex flex-col justify-center items-center h-[calc(100vh-80px)] absolute z-10 inset-0 bg-white dark:bg-black">
        <ThankYou amount={amount} />
      </div>
    );

  if (isProcessCompleted && !isPaypalSuccess)
    return (
      <div className="w-full flex flex-col justify-center items-center h-[calc(100vh-80px)] absolute z-10 inset-0 bg-white dark:bg-black">
        <PaymentFailed />
      </div>
    );

  return (
    <Container maxWidth="max-w-6xl -mt-16 lg:-mt-8">
      <div className="h-full w-full dark:border-2 dark:border-gray-900 px-6 py-8 md:px-16 md:py-16 shadow-projectBar rounded-2xl">
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
          <div className="grid gap-4 max-w-xl">
            <button
              disabled={isLoading}
              onClick={STRIPE_CHECKOUT}
              className={`cursor-pointer rounded text-4xl py-[10px] flex text-white justify-center items-center space-x-4 px-4 bg-violet hover:bg-darkBlue duration-300 ${
                isLoading && "opacity-50 cursor-not-allowed saturate-0"
              }`}
            >
              <FaCcDiscover />
              <FaCcMastercard />
              <SiVisa />
            </button>

            <PayPalScriptProvider
              options={{
                "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                currency: "USD",
                components: "buttons",
              }}
            >
              <PayPalButtons
                style={{
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  height: 55,
                  layout: "vertical",
                }}
                fundingSource={FUNDING.PAYPAL}
                createOrder={PAYPAL_CHECKOUT}
                onApprove={PAYPAL_ON_APPROVE}
                forceReRender={[amount, project, address]}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonationForm;
