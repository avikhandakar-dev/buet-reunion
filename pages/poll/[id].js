import Container from "@components/Container";
import LoadingScreen from "@components/LoadingScreen";
import VoteViewMultiple from "@components/Poll/VoteViewMultiple";
import VoteViewSingle from "@components/Poll/VoteViewSingle";
import AuthContext from "@lib/authContext";
import { auth, firestore, firestoreToJSON } from "@lib/firebase";
import { useDocumentDataSSR } from "@lib/useDocumentDataSSR";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const PollViewPage = ({ poll }) => {
  const pollRef = firestore.collection("polls").doc(poll.id);
  const [user, userIsLoading] = useAuthState(auth);
  const router = useRouter();
  const [pollRT] = useDocumentDataSSR(pollRef, { startWith: poll });
  const token = getCookie("token");
  useEffect(() => {
    const unsubs = () => {
      if (!userIsLoading) {
        if (!user && !token) {
          toast.error("Please login to vote!", {
            duration: 4000,
          });
          router.push("/poll/results/" + poll.id);
        }
      }
    };
    return unsubs();
  }, [userIsLoading]);

  if (userIsLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Container maxWidth="max-w-3xl">
        {pollRT?.questions.length > 1 ? (
          <VoteViewMultiple poll={pollRT} />
        ) : (
          <VoteViewSingle poll={pollRT} />
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

export default PollViewPage;
