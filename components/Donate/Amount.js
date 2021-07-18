import { FaCheckCircle } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { BiCircle } from "react-icons/bi";

const Amount = [
  {
    value: 10,
  },
  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 500,
  },
  {
    value: 0,
  },
];

const DonationAmount = ({ totalAmount }) => {
  const [selectedAmount, setSelectedAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [pCharge, setPCharge] = useState(false);
  const getTotalAmount = (value) => {
    return pCharge ? Number(value) * 0.02 + Number(value) : value;
  };

  useEffect(() => {
    const unsubs = () => {
      totalAmount(getTotalAmount(selectedAmount || customAmount));
    };
    return unsubs();
  }, [pCharge, selectedAmount, customAmount]);

  return (
    <div className="">
      <h1 className="font-medium lg:text-xl uppercase mb-4 text-gray-600 dark:text-gray-300">
        Amount
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {Amount.map((item, idx) => (
          <Fragment key={idx}>
            {item.value == 0 ? (
              <div className="flex justify-center items-center col-span-2">
                <span
                  className={`px-6 text-xl py-3 flex-shrink-0 border-2 rounded-l border-gray-200 dark:border-gray-700  border-r-0 ${
                    customAmount
                      ? "text-white bg-primary border-primary"
                      : "text-primary"
                  }`}
                >
                  $
                </span>
                <input
                  value={customAmount}
                  pattern="[0-9]*"
                  placeholder="Custom"
                  onChange={(event) => {
                    setSelectedAmount(null);
                    setCustomAmount(
                      event.target.validity.valid
                        ? event.target.value
                        : customAmount
                    );
                  }}
                  type="text"
                  className="flex-grow outline-none placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-200 focus:ring-0 focus:outline-none border-gray-200 font-medium rounded-r border-2 dark:border-gray-700 dark:focus:border-gray-700 py-3 px-2 text-xl text-center text-primary bg-transparent"
                />
              </div>
            ) : (
              <a
                onClick={() => {
                  setSelectedAmount(item.value);
                  setCustomAmount("");
                }}
                className={`text-center border-2 cursor-pointer border-gray-200 dark:border-gray-700 text-xl font-medium rounded p-3 ${
                  selectedAmount == item.value
                    ? "text-white bg-primary border-primary"
                    : "text-primary"
                }`}
              >
                <span className="text-sm align-top">$</span>
                {item.value}
              </a>
            )}
          </Fragment>
        ))}
      </div>
      <div
        onClick={() => setPCharge(!pCharge)}
        className="flex mt-4 items-center cursor-pointer"
      >
        {!pCharge ? (
          <BiCircle className="text-xl" />
        ) : (
          <FaCheckCircle className="text-xl text-primary" />
        )}
        <p className="ml-2 text-gray-600 dark:text-gray-300">
          I'd like to help cover the transaction fee (2%)
        </p>
      </div>
    </div>
  );
};

export default DonationAmount;
