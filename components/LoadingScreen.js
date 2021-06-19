import { CgSpinner } from "react-icons/cg";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-white dark:bg-black z-50">
      <span className="text-primary text-6xl animate-spin">
        <CgSpinner />
      </span>
    </div>
  );
};

export default LoadingScreen;
