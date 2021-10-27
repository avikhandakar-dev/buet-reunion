import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Container from "../Container";
import { firestore } from "@lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FeaturedProjectSlide from "@components/Project/FeaturedProjectSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination]);

const pagination = {
  clickable: true,
};
const Featured = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore
      .collection("projects")
      .where("published", "==", true)
      .where("featured", "==", true)
      .orderBy("createdAt", "desc")
  );

  if (loading) {
    return <></>;
  }
  if (!loading && projects.length < 1) {
    return <></>;
  }

  return (
    <div className="w-full relative h-full">
      <Container>
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="text-center mb-16">
            <h1 className="mb-4 text-4xl font-black md:text-6xl xl:text-7xl">
              Featured{" "}
              <span className="bg-clip-text whitespace-nowrap text-transparent bg-gradient-to-l from-primary to-sky">
                project
              </span>
            </h1>
            <Link href="/projects">
              <a className="text-xl w-max mx-auto lg:text-2xl transition-colors duration-300 hover:text-primary flex justify-center items-center">
                View all projects{" "}
                <span className="">
                  <AiOutlineArrowRight />
                </span>
              </a>
            </Link>
          </div>
          <Swiper
            loop={true}
            slidesPerView={1}
            pagination={pagination}
            grabCursor={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {projects.map((project) => (
              <SwiperSlide>
                <FeaturedProjectSlide project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Featured;
