import Container from "@components/Container";
import ResultsViewSingle from "@components/Poll/ResultsViewSingle";
import { firestore, firestoreToJSON } from "@lib/firebase";
import { useDocumentDataSSR } from "@lib/useDocumentDataSSR";

const PollResults = ({ poll }) => {
  const pollRef = firestore.collection("polls").doc(poll.id);
  const [pollRT] = useDocumentDataSSR(pollRef, { startWith: poll });
  return (
    <>
      <Container maxWidth="max-w-5xl">
        {pollRT?.questions.length > 1 ? (
          ""
        ) : (
          <ResultsViewSingle poll={pollRT} />
        )}
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const pollRef = firestore.collection("polls").doc(id);
  const poll = await pollRef.get();

  if (!poll.exists) {
    return {
      notFound: true,
    };
  }
  const serializeJSON = firestoreToJSON(poll);
  return {
    props: { poll: serializeJSON },
  };
};
export default PollResults;
