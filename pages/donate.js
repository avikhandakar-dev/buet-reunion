import Container from "@components/Container";
import { firestore } from "@lib/firebase";
import { Fragment, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

const DonatePage = () => {
  const [projects = [], loading, error] = useCollectionData(
    firestore.collection("projects").orderBy("createdAt", "desc")
  );
  const [customAmount, setCustomAmount] = useState(null);
  return (
    <Fragment>
      <Container>
        <div className="max-w-7xl mx-auto mt-16">
          <div
            className="flex space-x-4 relative"
            style={{ height: "max-content" }}
          >
            <div className="h-full w-full"></div>
            <div className="h-full w-full">
              <div>
                <h1 className="font-bold text-4xl mb-4">Donate now</h1>
                <p className="mb-4">Choose amount</p>
                <div className="grid grid-cols-3 gap-4">
                  {Amount.map((item) => (
                    <Fragment key={item.value}>
                      {item.value == 0 ? (
                        <div className="flex justify-center items-center col-span-2">
                          <span className="px-6 text-xl py-5 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                            $
                          </span>
                          <input
                            type="text"
                            className="flex-grow border-gray-200 dark:border-gray-700 py-5 px-2 text-xl text-center text-gray-700 dark:text-gray-300 bg-transparent"
                          />
                        </div>
                      ) : (
                        <a className="text-center border cursor-pointer border-gray-200 dark:border-gray-700 text-xl text-gray-600 dark:text-gray-300 p-5">
                          ${item.value}
                        </a>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default DonatePage;
