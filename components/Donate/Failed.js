import { BiError } from "react-icons/bi";

const PaymentFailed = () => {
  return (
    <div className="w-full mt-20 flex justify-center px-4 items-center h-[calc(100vh-80px)] bg-red-900">
      <div className="max-w-xl mx-auto text-center">
        <span className="text-5xl md:text-7xl text-red-200 mx-auto w-max block">
          <BiError />
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-9xl uppercase font-black text-red-200">
          Failed
        </h1>
        <p className="text-xl uppercase font-bold max-w-sm mx-auto">
          Payment Failed
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
