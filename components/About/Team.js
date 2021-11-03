import Container from "../Container";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "@lib/firebase";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

const Team = () => {
  const [members = [], loading] = useCollectionData(
    firestore.collection("team").orderBy("createdAt", "desc")
  );

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <span className="inline-flex text-5xl animate-spin text-primary">
          <CgSpinner />
        </span>
      </div>
    );
  }

  if (!loading && !members.length) {
    return <></>;
  }

  return (
    <Container bgColor="bg-gradient-to-l from-darkBlue to-darkSky">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <h1 className="mb-4 text-white text-4xl font-black md:text-6xl xl:text-7xl">
          Our Team
        </h1>
      </div>

      <div className="grid gap-10 mx-auto lg:max-w-screen-lg grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <div className="w-20 h-20 mb-2 rounded-full shadow relative overflow-hidden">
              <Image
                placeholder="blur"
                blurDataURL={member.avatar.loaderDownloadUrl}
                src={member.avatar.thumbDownloadUrl}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg text-white font-bold">{member.name}</p>
              <p className="text-sm text-gray-300">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Team;
