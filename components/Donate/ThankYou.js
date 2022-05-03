import { FiCheckCircle } from "react-icons/fi";

const ThankYou = ({ amount, status = "", loading = false }) => {
  return (
    <div className="w-full mt-20 flex justify-center px-4 items-center h-[calc(100vh-80px)]">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-5xl md:text-7xl text-green-500 mx-auto w-max block">
          <FiCheckCircle />
        </span>
        <h1 className=" text-5xl md:text-7xl lg:text-8xl uppercase font-black">
          Thank{" "}
          <span className="bg-gradient-to-l from-green-200 to-green-500 bg-clip-text whitespace-nowrap text-transparent">
            You
          </span>
        </h1>
        {!loading ? (
          <p className="text-xl uppercase font-bold max-w-sm mx-auto">
            Your donation of <span className="text-green-500">${amount}</span>{" "}
            has been processed
          </p>
        ) : (
          <p className="text-xl">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
