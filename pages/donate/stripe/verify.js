import { useRouter } from "next/router";
import useSWR from "swr";
import {
  BlobToBase64,
  fetchGetJSON,
  fetchPostJSON,
  serverTimestampToString,
} from "@lib/healper";
import { Fragment, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import ThankYou from "@components/Donate/ThankYou";
import PaymentFailed from "@components/Donate/Failed";
import { firestore } from "@lib/firebase";
import toast from "react-hot-toast";

const ResultPage = () => {
  const router = useRouter();
  const [sendMail, setSendMail] = useState(false);
  const [status, setStatus] = useState("Verifying payment...");
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/payment/stripe/sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  useEffect(() => {
    const unsubs = async () => {
      if (data?.payment_intent?.status === "succeeded") {
        if (!sendMail) {
          setStatus("Fetching donation data...");
          const donationRef = firestore
            .collection("donations")
            .doc(data?.metadata?.id);
          const snapshot = await donationRef.get();
          const donationData = snapshot.data();
          setStatus("Preparing receipt...");
          if (process.env.NODE_ENV === "production") {
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
                const mailResponse = await fetchPostJSON(
                  "/api/mail/send-receipt",
                  {
                    email: donationData.donorInfo?.email,
                    attachment: base64,
                  }
                );
                if (mailResponse.statusCode === 200) {
                  setSendMail(true);
                  toast.success("Donation receipt was sent to your email!");
                }
                setIsLoading(false);
              } catch (error) {
                setIsLoading(false);
              }
            } else {
              setIsLoading(false);
              toast.error("Can't send receipt!");
            }
          } else {
            toast.success("Donation success on test mode!");
          }
        }
      } else {
        if (data) {
          setIsLoading(false);
        }
      }
    };
    return unsubs();
  }, [data]);

  if (error) return <div>Failed to load</div>;

  if (!data || isLoading)
    return (
      <Fragment>
        <div className="w-full mt-20 flex flex-col justify-center items-center h-[calc(100vh-80px)]">
          <span className="text-5xl animate-spin text-primary">
            <CgSpinner />
          </span>
          <p>{status}</p>
        </div>
      </Fragment>
    );

  return data?.payment_intent?.status === "succeeded" ? (
    <ThankYou amount={(Number(data.amount_total) / 100).toFixed(2)} />
  ) : (
    <PaymentFailed />
  );
};

export default ResultPage;
