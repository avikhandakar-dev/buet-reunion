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
  let paymentSuccess = false;
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
          const donationRef = firestore
            .collection("donations")
            .doc(data?.metadata?.id);
          const snapshot = await donationRef.get();
          const donationData = snapshot.data();
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
            const buffer = genInvoice.arrayBuffer();
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
                toast.success("Donation receipt has been sent to your email!");
              }
              setIsLoading(false);
            } catch (error) {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            toast.error("Can't send receipt!");
          }
        }
      }
    };
    return unsubs();
  }, [data]);

  if (data?.payment_intent?.status === "succeeded") {
    paymentSuccess = true;
  }

  if (error) return <div>failed to load</div>;

  if (!data || isLoading)
    return (
      <Fragment>
        <div className="w-full mt-20 flex justify-center items-center h-[calc(100vh-80px)]">
          <span className="inline-flex text-5xl animate-spin text-primary">
            <CgSpinner />
          </span>
        </div>
      </Fragment>
    );

  return data?.payment_intent?.status === "succeeded" ? (
    <ThankYou amount={data.amount_total} />
  ) : (
    <PaymentFailed />
  );
};

export default ResultPage;
