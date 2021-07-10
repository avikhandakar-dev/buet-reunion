import Avatar from "@components/Avatar";
import Container from "@components/Container";
import Image from "next/image";

const PostHeader = ({ post, author }) => {
  return (
    <Container>
      <div className="max-w-2xl mx-auto text-center pt-16 lg:pt-24 pb-16 lg:pb-20">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4">
          {post.title}
        </h1>
        <p className="text-2xl lg:text-3xl lg:leding-relaxed mb-6">
          {post.excerpt}
        </p>
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Avatar user={author} />
          </div>
          <div>
            <span className="italic">by</span>{" "}
            <span className="font-bold">{post.userName}</span>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto text-center relative">
        {post.coverImage && (
          <div className="w-full relative overflow-hidden rounded-md h-auto transform group-hover:scale-110 transition duration-700">
            <Image
              placeholder="blur"
              blurDataURL={post.coverImage.loaderDownloadUrl}
              src={post.coverImage.oriDownloadUrl}
              width={1000}
              height={400}
              priority={true}
              objectFit="cover"
              layout="responsive"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default PostHeader;
