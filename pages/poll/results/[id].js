import Container from "@components/Container";
import ResultsViewSingle from "@components/Poll/ResultsViewSingle";
import { firestore, firestoreToJSON } from "@lib/firebase";
import { useDocumentDataSSR } from "@lib/useDocumentDataSSR";
import { useState, useEffect, useContext } from "react";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/router";
import AuthContext from "@lib/authContext";
import toast from "react-hot-toast";
import Empty from "@components/Svg/Empty";
import { dateExpired, fetchPostJSON } from "@lib/healper";

const PollResults = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [poll, setPoll] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const unsubs = async () => {
      if (!id) {
        return;
      }
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (!!idTokenResult.claims.admin) {
          const pollRef = firestore.collection("polls").doc(id);
          const pollData = await pollRef.get();
          if (pollData?.data().endDate) {
            const endDate = new Date(pollData.data().endDate);
            const today = new Date();
            if (!dateExpired(endDate, today)) {
              toast.error(
                "Sorry you can't see results until voting is closed!"
              );
              router.replace("/");
              return;
            }
          }
          setPoll(pollData.data());
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };
    return unsubs();
  }, [id, user]);
  if (isLoading) {
    return (
      <>
        <div className="max-w-7xl mx-auto flex justify-center items-center mb-32 h-screen">
          <span className="inline-flex text-5xl animate-spin text-primary">
            <CgSpinner />
          </span>
        </div>
      </>
    );
  }
  if (!isLoading && poll) {
    return (
      <>
        <Container maxWidth="max-w-5xl">
          {poll?.questions.length > 1 ? "" : <ResultsViewSingle poll={poll} />}
        </Container>
      </>
    );
  }
  if (!isLoading && !poll) {
    return (
      <>
        <div className="mb-32 px-5 flex flex-col justify-center items-center h-screen">
          <Empty width={150} className="text-gray-600 dark:text-gray-200" />
        </div>
      </>
    );
  }
};
export default PollResults;
