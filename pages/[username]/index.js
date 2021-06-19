import Container from "@components/Container";
import { getUserWithUsername, postToJSON } from "@lib/firebase";
import ProfileLayout from "layouts/profile";
import Link from "next/link";

const UserProfilePage = ({ user, posts }) => {
  if (posts.length < 1) {
    return (
      <div className="w-full text-center h-80 flex justify-center items-center flex-col">
        <img src="/img/no-posts.svg" className="mb-3" />
        <div className="text-center text-xl text-gray-400 font-light capitalize">
          No posts found
        </div>
      </div>
    );
  }
  return <div>{posts.length}</div>;
};

export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }
  return {
    props: { user, posts },
  };
}

UserProfilePage.layout = ProfileLayout;
export default UserProfilePage;
