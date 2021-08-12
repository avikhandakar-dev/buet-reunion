import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchGetJSON } from "@lib/healper";
import { Fragment } from "react";
import { CgSpinner } from "react-icons/cg";
import ThankYou from "@components/Donate/ThankYou";
import PaymentFailed from "@components/Donate/Failed";

const ResultPage = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/payment/stripe/sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  if (!data)
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
