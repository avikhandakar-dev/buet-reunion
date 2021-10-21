import LoadingScreen from "@components/LoadingScreen";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPostJSON } from "@lib/healper";
import toast from "react-hot-toast";

const VerifyPollToken = () => {
  const router = useRouter();
  const { token } = router.query;
  useEffect(() => {
    const unsubs = async () => {
      if (!token) {
        return;
      }
      const response = await fetchPostJSON("/api/poll/verify-token", {
        token,
      });
      if (response.statusCode === 200) {
        router.replace(`/poll/${response.pollId}`);
      } else {
        toast.error(response.message, { duration: 4000 });
        router.replace("/");
      }
    };
    return unsubs();
  }, [token]);
  return <LoadingScreen />;
};

export default VerifyPollToken;
