import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchGetJSON, PrintObject } from "@lib/healper";
import Container from "@components/Container";

const ResultPage = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/payment/stripe/sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  return (
    <Container>
      <div className="mt-32">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status || "loading..."}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data || "loading..."} />
      </div>
    </Container>
  );
};

export default ResultPage;
