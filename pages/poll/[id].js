import Container from "@components/Container";
import VoteViewSingle from "@components/Poll/VoteViewSingle";
import { firestore, firestoreToJSON } from "@lib/firebase";
import { useDocumentDataSSR } from "@lib/useDocumentDataSSR";

const PollViewPage = ({ poll }) => {
  const pollRef = firestore.collection("polls").doc(poll.id);
  const [pollRT] = useDocumentDataSSR(pollRef, { startWith: poll });
  return (
    <>
      <Container maxWidth="max-w-3xl">
        {pollRT?.questions.length > 1 ? "" : <VoteViewSingle poll={pollRT} />}
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

export default PollViewPage;
